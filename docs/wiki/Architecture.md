# Architecture

This page describes NutriVision's system design: how components are organized, how data flows, and why certain architectural decisions were made.

---

## Design Philosophy

NutriVision is built around three principles:

1. **Local-first** — No backend. User data never leaves the device unless the user explicitly exports it.
2. **AI-augmented** — Google Gemini 1.5 Flash provides food recognition. The app doesn't try to maintain a food database — it delegates that to a model that already knows what food looks like.
3. **PWA-native** — The app is installable and works offline after the first load, making it genuinely useful as a daily driver on mobile.

---

## Layer Overview

<div align="center">

<svg width="720" height="480" viewBox="0 0 720 480" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="archWikiBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
    <marker id="arrowArch" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,0 L0,8 L8,4 Z" fill="#10B981" />
    </marker>
  </defs>
  <rect width="720" height="480" rx="12" fill="url(#archWikiBg)" />
  <text x="360" y="34" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">NutriVision — Layered Architecture</text>

  <!-- Layer 1: Presentation -->
  <rect x="20" y="56" width="680" height="20" rx="4" fill="#0B8F87" opacity="0.3" />
  <text x="360" y="70" font-family="Arial, sans-serif" font-size="11" fill="#10B981" text-anchor="middle" font-weight="bold">PRESENTATION LAYER</text>

  <rect x="30" y="82" width="100" height="38" rx="6" fill="#0B8F87" stroke="#10B981" stroke-width="1" />
  <text x="80" y="98" font-family="Arial, sans-serif" font-size="10" fill="#fff" text-anchor="middle">Dashboard</text>
  <text x="80" y="112" font-family="Arial, sans-serif" font-size="8" fill="#d1fae5" text-anchor="middle">Daily Summary</text>

  <rect x="148" y="82" width="110" height="38" rx="6" fill="#0B8F87" stroke="#10B981" stroke-width="1" />
  <text x="203" y="98" font-family="Arial, sans-serif" font-size="10" fill="#fff" text-anchor="middle">CameraModule</text>
  <text x="203" y="112" font-family="Arial, sans-serif" font-size="8" fill="#d1fae5" text-anchor="middle">Photo + Analysis</text>

  <rect x="276" y="82" width="100" height="38" rx="6" fill="#0B8F87" stroke="#10B981" stroke-width="1" />
  <text x="326" y="98" font-family="Arial, sans-serif" font-size="10" fill="#fff" text-anchor="middle">Analytics</text>
  <text x="326" y="112" font-family="Arial, sans-serif" font-size="8" fill="#d1fae5" text-anchor="middle">14-Day Charts</text>

  <rect x="394" y="82" width="100" height="38" rx="6" fill="#0B8F87" stroke="#10B981" stroke-width="1" />
  <text x="444" y="98" font-family="Arial, sans-serif" font-size="10" fill="#fff" text-anchor="middle">Settings</text>
  <text x="444" y="112" font-family="Arial, sans-serif" font-size="8" fill="#d1fae5" text-anchor="middle">Profile Edit</text>

  <rect x="512" y="82" width="110" height="38" rx="6" fill="#0B8F87" stroke="#10B981" stroke-width="1" />
  <text x="567" y="98" font-family="Arial, sans-serif" font-size="10" fill="#fff" text-anchor="middle">Onboarding</text>
  <text x="567" y="112" font-family="Arial, sans-serif" font-size="8" fill="#d1fae5" text-anchor="middle">Profile Setup</text>

  <!-- Arrow down -->
  <line x1="360" y1="120" x2="360" y2="155" stroke="#10B981" stroke-width="1.5" marker-end="url(#arrowArch)" />

  <!-- Layer 2: Service -->
  <rect x="20" y="160" width="680" height="20" rx="4" fill="#2563EB" opacity="0.3" />
  <text x="360" y="174" font-family="Arial, sans-serif" font-size="11" fill="#60a5fa" text-anchor="middle" font-weight="bold">SERVICE LAYER</text>

  <rect x="60" y="188" width="150" height="44" rx="6" fill="#1e40af" stroke="#2563EB" stroke-width="1" />
  <text x="135" y="206" font-family="Arial, sans-serif" font-size="10" fill="#fff" text-anchor="middle">metabolicService.ts</text>
  <text x="135" y="222" font-family="Arial, sans-serif" font-size="8" fill="#bfdbfe" text-anchor="middle">BMR · TDEE · Macros · Water</text>

  <rect x="240" y="188" width="150" height="44" rx="6" fill="#1e40af" stroke="#2563EB" stroke-width="1" />
  <text x="315" y="206" font-family="Arial, sans-serif" font-size="10" fill="#fff" text-anchor="middle">geminiService.ts</text>
  <text x="315" y="222" font-family="Arial, sans-serif" font-size="8" fill="#bfdbfe" text-anchor="middle">Gemini API · JSON Schema</text>

  <rect x="420" y="188" width="150" height="44" rx="6" fill="#1e40af" stroke="#2563EB" stroke-width="1" />
  <text x="495" y="206" font-family="Arial, sans-serif" font-size="10" fill="#fff" text-anchor="middle">analyticsService.ts</text>
  <text x="495" y="222" font-family="Arial, sans-serif" font-size="8" fill="#bfdbfe" text-anchor="middle">Trend Aggregation · Alerts</text>

  <!-- Arrow down -->
  <line x1="360" y1="232" x2="360" y2="268" stroke="#10B981" stroke-width="1.5" marker-end="url(#arrowArch)" />

  <!-- Layer 3: Storage -->
  <rect x="20" y="272" width="680" height="20" rx="4" fill="#312e81" opacity="0.4" />
  <text x="360" y="286" font-family="Arial, sans-serif" font-size="11" fill="#a5b4fc" text-anchor="middle" font-weight="bold">STORAGE LAYER</text>

  <rect x="80" y="298" width="200" height="50" rx="6" fill="#312e81" stroke="#818cf8" stroke-width="1" />
  <text x="180" y="318" font-family="Arial, sans-serif" font-size="11" fill="#fff" text-anchor="middle">LocalStorage</text>
  <text x="180" y="336" font-family="Arial, sans-serif" font-size="8" fill="#c7d2fe" text-anchor="middle">UserProfile · MealLog metadata · WaterLog</text>

  <rect x="310" y="298" width="200" height="50" rx="6" fill="#312e81" stroke="#818cf8" stroke-width="1" />
  <text x="410" y="318" font-family="Arial, sans-serif" font-size="11" fill="#fff" text-anchor="middle">IndexedDB (db.ts)</text>
  <text x="410" y="336" font-family="Arial, sans-serif" font-size="8" fill="#c7d2fe" text-anchor="middle">Meal image blobs (crash-proof)</text>

  <!-- Arrow down -->
  <line x1="360" y1="348" x2="360" y2="384" stroke="#10B981" stroke-width="1.5" marker-end="url(#arrowArch)" />

  <!-- Layer 4: External -->
  <rect x="20" y="388" width="680" height="20" rx="4" fill="#064e3b" opacity="0.4" />
  <text x="360" y="402" font-family="Arial, sans-serif" font-size="11" fill="#6ee7b7" text-anchor="middle" font-weight="bold">EXTERNAL (HTTPS ONLY)</text>

  <rect x="240" y="414" width="240" height="44" rx="6" fill="#064e3b" stroke="#10B981" stroke-width="1" />
  <text x="360" y="432" font-family="Arial, sans-serif" font-size="11" fill="#fff" text-anchor="middle">Google Gemini API</text>
  <text x="360" y="448" font-family="Arial, sans-serif" font-size="8" fill="#a7f3d0" text-anchor="middle">One-time photo upload per meal analysis</text>
</svg>

</div>

<br>

---

## Component Reference

### Presentation Components (`src/components/`)

| Component | Responsibility |
|---|---|
| `Layout.tsx` | App shell, navigation bar, hamburger menu on mobile |
| `OnboardingForm.tsx` | Initial user profile collection (age, sex, height, weight, activity, target) |
| `Dashboard.tsx` | Daily calorie and macro totals, water intake logging |
| `CameraModule.tsx` | Camera/file input, Base64 encoding, triggers Gemini analysis |
| `Analytics.tsx` | 14-day trend charts (Recharts), system alerts, CSV export |
| `Settings.tsx` | Profile editing with live BMR/TDEE recalculation |
| `MealDetailModal.tsx` | Meal log entry detail: photo, food items, macro breakdown |
| `Auth.tsx` | Authentication guard (optional Firebase auth flow) |

### Service Modules (`src/services/`)

| Service | Responsibility |
|---|---|
| `metabolicService.ts` | Mifflin-St Jeor BMR, TDEE calculation, macro partitioning, water targets |
| `geminiService.ts` | Constructs the Gemini API request with image + JSON schema prompt, parses response |
| `analyticsService.ts` | Aggregates meal logs for trend analysis, generates threshold-based system alerts |
| `db.ts` | IndexedDB wrapper for storing and retrieving meal image blobs |
| `firebase.ts` | Firebase configuration (optional, for authentication) |

### Data Types (`src/types.ts`)

| Type | Fields |
|---|---|
| `UserProfile` | age, sex, heightCm, weightKg, activityLevel, targetWeightKg, bmr, tdee, dailyCalorieTarget |
| `FoodItem` | id, name, portionGrams, calories, protein, fat, carbs, fiber?, sodium?, confidence, isUserCorrected? |
| `MealLog` | id, timestamp, imageUrl, items[], totalCalories, totalProtein, totalFat, totalCarbs, uncertaintyRange |
| `WaterLog` | date (YYYY-MM-DD), amountMl |

---

## Storage Strategy

### Why Two Storage Mechanisms?

**LocalStorage** is synchronous and fast, which makes it ideal for small structured data that needs to be read on every render (user profile, meal metadata, water logs). However, LocalStorage has a ~5MB limit per origin.

**IndexedDB** is asynchronous and supports large binary objects (blobs). Meal photos can be several hundred kilobytes to a few megabytes each. Storing them in IndexedDB keeps LocalStorage lean and prevents quota errors.

### Data Isolation

All storage keys are namespaced to the app. No data is shared with other origins. Clearing browser data (cookies/cache) will erase NutriVision data — this is expected behavior for a local-first app.

---

## AI Integration

`geminiService.ts` sends a Base64-encoded image to the Google Gemini 1.5 Flash model with a structured prompt that enforces a JSON output schema. The schema specifies fields for each identified food item: name, portion, calories, protein, fat, carbs, fiber, sodium, and confidence score.

The response is validated and parsed before being stored. If parsing fails, the error is surfaced to the user rather than silently discarded.

The model's output also includes an `uncertaintyRange` — a `[min, max]` calorie estimate — because even a cutting-edge AI knows a photograph of pasta is not a nutrition label.
