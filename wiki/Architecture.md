# Architecture

This page describes NutriVision's system architecture: how the components are structured, how data flows through the app, and what lives where in the codebase.

---

## Overview

NutriVision is a single-page React application with a clear 3-layer architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                        UI LAYER                             │
│  OnboardingForm · Dashboard · CameraModule · Analytics      │
│  Settings · MealDetailModal · Layout · UI primitives        │
├─────────────────────────────────────────────────────────────┤
│                     SERVICE LAYER                           │
│  geminiService · metabolicService · analyticsService · db   │
├─────────────────────────────────────────────────────────────┤
│                     STORAGE LAYER                           │
│       LocalStorage (JSON)    ·    IndexedDB (Blobs)         │
└─────────────────────────────────────────────────────────────┘
```

<div align="center">
<br/>
<img src="../docs/assets/architecture.svg" alt="Architecture Diagram" width="820"/>
<br/><br/>
</div>

---

## UI Layer

All UI components live in `src/components/`. State is managed at the `App.tsx` level and passed down as props. Components are stateless where possible.

| Component | Responsibility |
|---|---|
| `App.tsx` | Root component; owns all application state; routes between views |
| `OnboardingForm.tsx` | First-run profile setup wizard; calculates BMR/TDEE on submission |
| `Dashboard.tsx` | Main daily view; macro/calorie ring display; meal log list; water tracking |
| `CameraModule.tsx` | Camera capture and file upload; sends image to `geminiService`; displays results |
| `Analytics.tsx` | 14-day Recharts graphs; system alert generation; rolling trend display |
| `Settings.tsx` | Profile editing; API key management; data export trigger; full reset |
| `MealDetailModal.tsx` | Per-meal inspection; item-level editing and correction |
| `Layout.tsx` | App shell with navigation header; mobile hamburger menu |
| `ui/` | Reusable primitives: buttons, cards, inputs, rings, badges |

### State Management

There is no Redux, no Zustand, no context magic. Just `useState` and `useEffect` in `App.tsx`, with data persisted to LocalStorage on every change:

```typescript
// Profile, meals, and water logs are initialised from localStorage
const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
  const saved = localStorage.getItem('nutrivision_profile');
  return saved ? JSON.parse(saved) : null;
});

// And persisted back on every update
useEffect(() => {
  if (userProfile) localStorage.setItem('nutrivision_profile', JSON.stringify(userProfile));
}, [userProfile]);
```

---

## Service Layer

All business logic lives in `src/services/`. These are pure TypeScript modules — no classes, no singletons.

### `geminiService.ts`

Handles all communication with the Google Gemini API.

**Key function**: `analyzeFoodImage(base64Image, scaleContext?)`

- Constructs a prompt instructing the model to act as a quantitative dietitian
- Enforces a strict `responseSchema` so the model *must* return structured JSON
- Sets `temperature: 0.1` to minimise hallucinations
- Returns a typed `FoodItem[]` array

**JSON schema enforced fields per food item**:
```
id, name, portionGrams, calories, protein, fat, carbs, confidence
+ optional: fiber, sodium
```

### `metabolicService.ts`

All BMR, TDEE, and macro calculations.

**Mifflin-St Jeor:**
```
Male:   BMR = 10×weight + 6.25×height − 5×age + 5
Female: BMR = 10×weight + 6.25×height − 5×age − 161
TDEE = BMR × activityFactor
```

**Activity factors** (from `ActivityLevel` enum):
| Level | Factor |
|---|---|
| Sedentary | 1.2 |
| Lightly Active | 1.375 |
| Moderately Active | 1.55 |
| Very Active | 1.725 |
| Extremely Active | 1.9 |

**Hydration target**: `35ml × weightKg + (activityTier − 1) × 500ml`

**Macro targets**:
- Protein: `1.8g × weightKg`
- Fat: `0.8g × weightKg`
- Carbs: `(remainingCalories after protein + fat) ÷ 4`

### `analyticsService.ts`

Aggregates meal data for the Analytics view.

- Rolls up calories and macros per day over the last 14 days
- Generates system alerts (protein deficiency, caloric surplus, hydration failure)
- Serialises meal logs to CSV for export

### `db.ts`

IndexedDB abstraction layer for image storage.

- `saveImage(id, blob)` — stores a meal photo Blob against a meal ID
- `getImage(id)` — retrieves a Blob and returns an object URL
- `deleteImage(id)` — removes a Blob when a meal is deleted

Meal images are stored separately from meal metadata because `localStorage` has a ~5MB limit that image data would immediately saturate.

---

## Storage Layer

### LocalStorage Keys

| Key | Type | Content |
|---|---|---|
| `nutrivision_profile` | JSON string | `UserProfile` object |
| `nutrivision_meals` | JSON string | `MealLog[]` array |
| `nutrivision_water` | JSON string | `Record<string, number>` (date → ml) |
| `gemini_api_key` | string | Gemini API key (set during onboarding or in Settings) |

### IndexedDB

Database: `NutriVisionDB`, Object store: `images`

Each entry: `{ id: string (meal ID), blob: Blob }`

The DB is opened lazily on first write; the abstraction in `db.ts` handles version upgrades.

---

## Data Flow

<div align="center">
<br/>
<img src="../docs/assets/dataflow.svg" alt="Data Flow Diagram" width="920"/>
<br/><br/>
</div>

**Meal logging flow:**

1. `CameraModule` captures image → converts to Base64 JPEG
2. `geminiService.analyzeFoodImage()` sends Base64 to Gemini API
3. Gemini returns JSON array of `FoodItem` objects
4. User reviews/corrects items in `CameraModule`
5. On save: `MealLog` metadata → `localStorage`; image Blob → IndexedDB
6. `Dashboard` reads from `localStorage` to display updated totals
7. `Analytics` reads from `localStorage` to update 14-day charts

---

## Type System

All core domain types are in `src/types.ts`:

```typescript
interface UserProfile {
  age, sex, heightCm, weightKg, activityLevel, targetWeightKg,
  bmr, tdee, dailyCalorieTarget
}

interface FoodItem {
  id, name, portionGrams, calories, protein, fat, carbs,
  fiber?, sodium?, confidence, isUserCorrected?
}

interface MealLog {
  id, timestamp, imageUrl, items: FoodItem[],
  totalCalories, totalProtein, totalFat, totalCarbs,
  uncertaintyRange: [min, max]
}

interface WaterLog {
  date: string  // YYYY-MM-DD
  amountMl: number
}
```

---

## Build & Tooling

| Tool | Role |
|---|---|
| **Vite 6** | Build tool and dev server |
| **TypeScript 5.x** | Static typing (`strict: true`) |
| **TailwindCSS 3** | Utility-first styling |
| **vite-plugin-pwa** | Service worker generation + PWA manifest |
| **@vitejs/plugin-react** | JSX transform |
| **@google/genai** | Official Gemini SDK |
| **recharts** | Analytics charting |
| **lucide-react** | Icon library |

---

*See [Installation](Installation.md) to get a development environment running.*
