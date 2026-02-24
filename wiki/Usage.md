# Usage

This page covers how to use every feature of NutriVision.

---

## First Launch — Onboarding

When you open NutriVision for the first time, you'll see the **Onboarding Form**. Fill in:

| Field | Notes |
|---|---|
| **Age** | Used in BMR calculation |
| **Biological sex** | Male/Female — affects BMR offset (±5 kcal) |
| **Height (cm)** | Used in BMR calculation |
| **Weight (kg)** | Used in BMR and macro/hydration targets |
| **Activity Level** | See table below |
| **Target Weight (kg)** | Optional — used for goal display context |

**Activity Level guide:**

| Level | Who You Are |
|---|---|
| Sedentary | Desk job, minimal exercise. You describe yourself as "not a morning person." |
| Lightly Active | 1–3 workouts per week, or you walk a lot but pretend that counts as training. |
| Moderately Active | 3–5 workouts per week. You own a foam roller you occasionally look at. |
| Very Active | Hard training 6–7 days per week. You know what your VO2 max is. |
| Extremely Active | Physical job + hard training. Athlete, construction worker, or someone with genuinely alarming amounts of energy. |

After submission, NutriVision calculates your **BMR**, **TDEE**, and **daily macro targets** and takes you to the Dashboard.

---

## The Dashboard

The Dashboard is your daily home base.

### Macro Ring Display
The top of the Dashboard shows four circular rings:
- **Calories** — today's intake vs. your TDEE target
- **Protein** — grams consumed vs. `1.8g/kg` target
- **Carbs** — grams consumed vs. calculated budget
- **Fat** — grams consumed vs. `0.8g/kg` target

Rings fill as you log meals. They glow green when you're on track and turn slightly ominous when you're in surplus. You'll know.

### Hydration Tracker
Below the macro rings is your **daily water intake** display with a target based on `35ml/kg + activity modifier`.

Quick-add buttons: `+250ml`, `+500ml`, or a custom amount. Tap and go.

### Meal Log List
Logged meals appear below, in reverse chronological order. Each entry shows:
- A thumbnail of the meal photo
- Total calories
- Macro breakdown
- Timestamp
- An **uncertainty range** (±20%) because physics

Tap any meal to open the **MealDetailModal** for inspection or editing.

---

## Logging a Meal

This is the core feature. Here's how it works:

### Step 1: Open the Camera Module
Tap the **+ Add Meal** / camera button on the Dashboard.

### Step 2: Capture or Upload
- **Take a photo**: Tap "Use Camera" to open your device camera
- **Upload from gallery**: Tap "Upload Photo" to select an existing image

**Tips for better AI accuracy:**
- Photograph from directly above the plate (top-down view)
- Include a reference object (a fork, a phone, a standard dinner plate) for scale
- Good lighting matters more than high resolution
- Separate components if possible (don't stack everything into one pile)

### Step 3: Add Scale Context (Optional)
In the "Scale Context" field, you can add a hint like:
- "Standard dinner plate, 28cm diameter"
- "Regular wine glass"
- "Takeaway box, roughly 600ml"

The AI uses this to calibrate portion size estimates.

### Step 4: Analyse
Tap **Analyse**. The image is sent to Gemini 1.5 Flash. Processing takes about 2–4 seconds on a good connection.

### Step 5: Review Results
The AI returns a list of detected food items with individual macro estimates. You can:
- **Accept** the results as-is
- **Edit** any item (name, weight, macros) if the AI got it wrong
- **Delete** items that weren't detected correctly
- **Add** items the AI missed

### Step 6: Save
Tap **Save Meal**. The metadata goes to LocalStorage; the photo goes to IndexedDB. You're done.

---

## The MealDetailModal

Tap any meal in the log to open the detail view.

You can:
- See all detected food items and their individual macros
- Edit item names, portion sizes, or macro values
- Delete individual items
- Delete the entire meal entry
- View the original photo

Edited items are marked as `isUserCorrected: true` internally — no special display, but the correction is flagged in the data for export.

---

## Analytics

Navigate to the **Analytics** tab for the 14-day view.

### Charts
- **Calorie Trend** — daily intake vs. your TDEE target over 14 days. The gap tells the story.
- **Macro Breakdown** — stacked bar chart showing protein/fat/carbs split per day
- **Hydration Trend** — daily water intake vs. target

### System Alerts
Below the charts, the app surfaces any active alerts:

| Alert | Trigger |
|---|---|
| ⚠️ Protein deficiency | Average protein consistently below target |
| ⚠️ Caloric surplus | Running significantly above TDEE for multiple days |
| ⚠️ Hydration failure | Not meeting daily water targets |
| ✅ On track | Everything looks reasonable — enjoy the dopamine |

---

## Exporting Data

In the app header, tap the **Export** button (available when logged in).

This downloads `nutrivision_data.csv` — your full meal history with columns:

```
Timestamp, Category, Item, Calories, Protein, Carbs, Fat
```

Import into Excel, Google Sheets, or a Python notebook. Pivot to your heart's content.

---

## Settings

Navigate to **Settings** to:

| Action | Notes |
|---|---|
| Update profile | Age, weight, activity level, targets recalculate immediately |
| Update Gemini API key | If your key changes or you want to use a different one |
| Export data | Same as the header export button |
| Reset all data | Wipes everything — profile, meals, water, photos. Irreversible. |

---

## Installing as a PWA

### iOS (Safari)
1. Open the app in Safari
2. Tap the **Share** button (box with arrow)
3. Tap **Add to Home Screen**
4. Name it, tap **Add**

### Android (Chrome)
1. Open the app in Chrome
2. Tap the three-dot menu
3. Tap **Add to Home screen** or **Install App**
4. Confirm

Once installed, the app opens full-screen without browser chrome. It works offline after the first load (service worker caches all static assets).

---

## Keyboard Shortcuts

The app is primarily touch-optimised, but desktop users will find standard web navigation works throughout. No custom shortcuts — just a clean, mouse-friendly UI.

---

*For troubleshooting specific issues, see [Troubleshooting](Troubleshooting.md).*
