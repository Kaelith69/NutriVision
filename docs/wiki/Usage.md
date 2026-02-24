# Usage

This page walks through every feature of NutriVision and how to use it effectively.

---

## First Launch: Onboarding

When you open NutriVision for the first time, you'll see the **Onboarding Form**. This is not optional — the app needs your metabolic data to compute anything meaningful.

Fill in:

| Field | Notes |
|---|---|
| **Age** | In years. Not your biological age. Your actual age. |
| **Biological Sex** | Used for the Mifflin-St Jeor BMR offset (+5 for male, -161 for female) |
| **Height** | In centimeters |
| **Weight** | In kilograms |
| **Activity Level** | Ranges from Sedentary (1.2) to Extremely Active (1.9) |
| **Target Weight** | Your goal weight in kg — used for calorie deficit/surplus calculations |

After submission, the app calculates and stores:
- **BMR** — Basal Metabolic Rate (calories burned at rest)
- **TDEE** — Total Daily Energy Expenditure (BMR × activity multiplier)
- **Daily Calorie Target** — TDEE adjusted toward your target weight
- **Macro Targets** — Protein (1.8g/kg), Fat (0.8g/kg), Carbs (remainder)
- **Water Target** — 35ml/kg + ~500ml per activity tier above Sedentary

---

## Logging a Meal

1. Navigate to the **Camera** tab
2. Tap the upload/camera button
3. Select or capture a photo of your meal
4. Wait 1–3 seconds for Gemini AI to analyze the image
5. Review the returned food items, macro breakdown, and uncertainty range
6. The meal is automatically saved to your log

The AI identifies individual food items, estimates portion sizes, and returns:
- Calories, protein, fat, carbohydrates
- Fiber and sodium (where available)
- A confidence score per item
- An overall uncertainty range (`[min, max]` calories)

> The uncertainty range exists because the AI is analyzing a 2D photo of food, not weighing it. Treat the numbers as high-quality estimates, not lab measurements.

---

## Viewing the Dashboard

The **Dashboard** is your daily command center. It shows:

- Total calories consumed vs. your daily target (progress ring / bar)
- Macro breakdown: protein, fat, carbs consumed vs. targets
- Today's meal log with thumbnails
- Water intake tracker with your daily target

### Logging Water

Tap the water tracker on the Dashboard to log intake. Each tap adds a configurable amount (default: 250ml). Your daily target is displayed alongside your current total.

---

## Meal Detail View

Tap any meal in your log to open the **Meal Detail Modal**. This shows:

- The stored meal photo (retrieved from IndexedDB)
- Each identified food item with individual macro breakdown
- The confidence score for each item
- The uncertainty range for the meal

---

## Analytics

The **Analytics** tab shows trends across the last 14 days:

- **Calorie Trend** — Daily calorie intake plotted against your target
- **Macro Breakdown** — Daily protein, fat, and carb intake over time
- **System Alerts** — Automated alerts when patterns are detected:
  - `⚠️ Caloric surplus` — consistently over target
  - `⚠️ Caloric deficiency` — consistently under target
  - `⚠️ Protein shortfall` — consistently below protein target

### CSV Export

The Analytics tab includes a **Download CSV** button. This exports your full meal history as a comma-separated values file, including:

- Date and timestamp
- Meal ID
- Total calories, protein, fat, carbs per meal
- Uncertainty range

Open it in Excel, Google Sheets, or any tool that accepts CSV. Make pivot tables. You've earned them.

---

## Settings

The **Settings** tab lets you update your profile at any time. Changes trigger an immediate recalculation of:

- BMR and TDEE
- Daily calorie target
- Macro targets
- Water target

Your historical meal data is not affected by profile changes — old logs retain their original macro values.

---

## Installing as a PWA

NutriVision is a Progressive Web App. You can install it to your home screen:

### iOS (Safari)
1. Open NutriVision in Safari
2. Tap the **Share** button (box with arrow)
3. Tap **Add to Home Screen**

### Android (Chrome)
1. Open NutriVision in Chrome
2. Tap the three-dot menu
3. Tap **Install app** or **Add to Home Screen**

### Desktop (Chrome / Edge)
1. Look for the install icon in the address bar
2. Click **Install**

Once installed, the app works offline. The service worker caches all app assets on first load. Your meal data is already local, so there's nothing to sync.

---

## Exporting / Backing Up Data

Currently, NutriVision does not have an automatic backup system. Your data lives in browser storage (`LocalStorage` and `IndexedDB`).

To preserve your data:
- Use the **CSV export** to save your meal history
- Do not clear browser data unless you're okay losing your meal logs

A full data export feature (JSON dump of all local storage) is on the [Roadmap](./Roadmap.md).
