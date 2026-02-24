# Roadmap

This page tracks what's planned for NutriVision. Items at the top are closer to shipping.

---

## In Progress / Next Up

### 🔲 Barcode Scanner

Scan packaged food barcodes to instantly import nutritional information from a food database. For when your meal comes with a label and you don't feel like photographing the nutrition facts panel.

- Lookup via Open Food Facts API (open source, no key required)
- Integrates with the existing `MealLog` data model
- Same confidence + uncertainty UX as the AI analysis flow

### 🔲 Full JSON Data Export

Export all local data (UserProfile, MealLogs, WaterLogs) as a single JSON file. For portability, full backups, and people who like to know their data is theirs.

---

## Planned

### 🔲 Voice-to-Log

Log a meal by speaking: "Two eggs, scrambled, with a slice of whole wheat toast." The AI parses the text and returns estimated macros. Useful when your hands are full of food.

### 🔲 Multi-Day Meal Planning

Plan meals in advance across a week. See projected calorie and macro totals before you eat them, rather than after. A feature for the optimistic and the organized.

### 🔲 Custom Macro Presets

Save named macro configurations (e.g., "Cutting", "Bulking", "Maintenance") and switch between them without re-entering your full profile. For people whose goals change faster than their weight.

### 🔲 Dark / Light Theme Toggle

The app currently uses a dark theme. Some users — the ones who use light mode, the brave ones — have requested the option. This is planned.

### 🔲 Multiple User Profiles

Support for more than one user profile per browser/device. Useful for households where multiple people want to track nutrition on the same device without overwriting each other's data.

### 🔲 Macro Goal Presets

Pre-configured macro targets for common goals:
- Standard maintenance
- Ketogenic (high fat, very low carb)
- High-protein (athlete)
- Plant-based optimization

### 🔲 Weekly Summary Report

A one-page weekly summary showing average intake vs. targets, best and worst days, and a simple trend score. Exportable as PDF or image for the oversharing crowd.

---

## Considering (Not Committed)

### 🔲 Apple Health / Google Fit Integration

Sync macro and water data with platform health apps. Technically feasible via Web APIs, but adds complexity and dependency on platform-specific bridges.

### 🔲 Restaurant Menu Parsing

Point the camera at a restaurant menu and get estimated macros for each item. Technically interesting; practically difficult due to menu format variability.

### 🔲 AI Meal Suggestions

Based on your remaining macros for the day, suggest what to eat. "You need 40g protein and 200 calories. Here are three options." The AI becomes your sous chef. This is either genius or terrifying.

---

## Completed ✅

- [x] AI food photo analysis (Gemini 1.5 Flash)
- [x] Mifflin-St Jeor metabolic calculations
- [x] Dynamic water target algorithm
- [x] Dashboard with daily macro summaries
- [x] 14-day analytics with trend charts
- [x] System alerts (surplus, deficiency, protein shortfall)
- [x] CSV export
- [x] Meal photo storage in IndexedDB
- [x] Zero-backend, local-first architecture
- [x] PWA with service worker caching
- [x] iOS / Android installability
- [x] Onboarding form
- [x] Settings with live recalculation
- [x] Multiple deployment targets (Vercel, Netlify, Firebase, GitHub Pages, Surge)

---

## Contributing to the Roadmap

Have an idea that isn't on this list? Open an issue on [GitHub](https://github.com/Kaelith69/NutriVision/issues) tagged `enhancement`. If it fits the local-first, privacy-first design philosophy, it'll get serious consideration.

Ideas that require a backend, a database server, or user accounts are unlikely to be accepted — that's a design constraint, not an oversight.
