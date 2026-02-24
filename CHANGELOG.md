# Changelog

All notable changes to NutriVision are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versions follow [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Planned
- Barcode scanner for packaged foods (because not everything is photogenic)
- Custom food entries (manual macro input for the die-hards)
- Multi-day meal planning

---

## [1.0.0] — 2024

### Added
- **AI Food Recognition** — Google Gemini 1.5 Flash vision model with JSON schema enforcement. Point camera at food; receive macros. Magic, but make it science.
- **Mifflin-St Jeor metabolic engine** — BMR + TDEE calculations with 5 activity tiers. More accurate than "just eat less and move more."
- **Dynamic hydration targeting** — `35ml/kg` base + activity modifier. Smarter than your gym teacher's "8 glasses" advice.
- **Macro partitioning** — Protein at `1.8g/kg`, fat at `0.8g/kg`, carbs from the remainder. The protein bros were right (about protein at least).
- **Dashboard** — Daily calorie and macro ring display with meal log. The ring fills up as you eat. It judges you in a circle.
- **14-day analytics** — Recharts-powered trend graphs for calories, macros, and hydration. Because patterns are more honest than vibes.
- **System alerts** — Automatic detection of protein deficiency, caloric surplus, and hydration failures. Your own personal nutritional conscience.
- **Meal photo storage** — IndexedDB Blob store for crash-proof image persistence. Receipts for every crime committed at the dinner table.
- **PWA support** — Installable on iOS and Android via `vite-plugin-pwa`. Offline-first service worker. Works on the subway.
- **CSV export** — One-click download of full meal history. For spreadsheet people.
- **Multi-platform deployment** — Vercel, Netlify, Firebase, Surge.sh, and GitHub Pages configs included. We covered our deployment bases.
- **Zero-server architecture** — All data stored locally (LocalStorage + IndexedDB). No backend. No cloud. No drama.
- **Onboarding wizard** — First-run profile setup that calculates your metabolic targets immediately.
- **Settings page** — Profile editing, data reset, and API key management.
- **MealDetailModal** — Inspect and correct any individual meal log. The AI is good, not perfect; you have veto power.

### Technical
- React 18 with functional components and hooks throughout
- TypeScript strict mode — because `any` is a character flaw
- Vite 6 build tooling
- TailwindCSS for styling with responsive mobile-first design
- `@google/genai` SDK v1.41.0 for Gemini integration
- `lucide-react` for icons
- `recharts` for analytics visualizations

---

## Notes

### On Version Numbers
`1.0.0` means "we believe this works for real humans." It does not mean "we have tested every edge case involving competitive eaters."

### On the AI
The AI uses `temperature: 0.1` — as close to deterministic as a language model gets. It will still occasionally think your omelette is a frittata. These are the same thing and we refuse to fight about it.

### On Privacy
No tracking. No analytics. No `console.log` left in production that phones home. Your data is yours, stored on your device, visible to no one else.

---

*Fixed bug where reality stopped working: the app now correctly handles the case where a user photographs their hand instead of their food. (The AI tries its best.)*
