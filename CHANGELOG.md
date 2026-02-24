# Changelog

All notable changes to NutriVision are documented here.  
Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Planned
- Barcode scanner for packaged foods
- Voice-to-log meal entries
- Multi-day meal planning
- Custom macro presets
- Dark/light theme toggle
- Multiple user profiles

---

## [1.0.0] — Initial Release

### Added
- AI-powered food photo analysis using Google Gemini 1.5 Flash
- Strict JSON schema enforcement on AI output — no haiku, just macros
- Uncertainty range (±20%) on every AI analysis, because humility is a virtue
- Metabolic calculations: BMR via Mifflin-St Jeor, TDEE with activity multipliers (1.2–1.9)
- Macro targets: Protein at 1.8g/kg, Fat at 0.8g/kg, Carbs from remaining budget
- Dynamic daily water target: 35ml/kg base + ~500ml per activity tier
- Dashboard with daily calorie and macro summaries
- 14-day analytics with trend charts powered by Recharts
- System alerts for caloric surplus, deficiency, and protein shortfall
- CSV export for your inner data scientist
- Meal photo storage in IndexedDB — locally, privately, forever yours
- Meal log metadata in LocalStorage
- Zero-backend architecture — no server, no cloud, no drama
- PWA support: installable on iOS and Android, works offline
- Service worker caching for fast subsequent loads
- Onboarding form for user profile setup
- Settings page for profile editing with live recalculation
- Meal detail modal with stored image and macro breakdown
- Multiple deployment configs: Vercel, Netlify, Firebase, GitHub Pages, Surge.sh

### Fixed
- Fixed bug where reality stopped working (it was a timezone issue, as always)
- Fixed the "I ate a salad but logged a cheeseburger" edge case (the AI, not you — we can't fix you)

### Known Issues
- App cannot prevent you from lying about the donut. Hardware limitation.
- Water logs may appear slightly off if you celebrate New Year's in UTC+14 (congrats on living in the future)
- Blank screen on deploy? Check your `VITE_GEMINI_API_KEY` environment variable. The app doesn't work well without a brain.

---

*Changelog entries are written by humans. Any resemblance to actual engineering commit messages is purely aspirational.*
