# Roadmap

This page tracks planned features for NutriVision — what's coming, why it matters, and how you can help build it.

Items are ordered by planned version. Nothing here is a promise, everything here is a direction.

---

## Current Status: v1.0.0 ✅

Core feature set is complete and stable:
- AI food recognition via Gemini 1.5 Flash
- Mifflin-St Jeor metabolic calculations
- LocalStorage + IndexedDB storage
- 14-day analytics dashboard
- PWA (installable, offline-capable)
- CSV export
- Multi-platform deployment

---

## v1.1 — Manual Food Entry & Corrections

**Goal**: Let users log food without a photo. Sometimes it's a protein bar. You know what's in it.

### Features
- **Manual meal entry form** — enter food name, weight, and macros directly
- **Food name autocomplete** — fuzzy search against a small built-in USDA dataset for common foods
- **Portion presets** — "1 cup", "1 serving (per label)", "100g" quick selectors
- **Improved correction UX** — inline editing in the MealDetailModal instead of a separate form

### Acceptance Criteria
- [ ] User can add a meal entry with no photo
- [ ] User can search for food by name and get macro estimates
- [ ] Manually entered items are visually distinguishable from AI-detected items in the meal log
- [ ] Existing AI-based flow is unaffected

**Good first contribution**: The USDA dataset integration. See issue `#food-database` (when created).

---

## v1.2 — Barcode Scanner

**Goal**: For packaged foods with nutrition labels, scanning is faster and more accurate than AI vision.

### Features
- **Camera-based barcode scan** using the browser's `BarcodeDetector` API (no external library)
- **Open Food Facts API integration** — free, open nutrition database with millions of products
- **Fallback to AI vision** if barcode scan fails or product isn't in the database

### Technical Notes
- `BarcodeDetector` is available in Chrome/Edge on Android and desktop; Safari support is limited
- Open Food Facts API is public and free; no API key required
- The scan result returns product macros per 100g; user sets their portion weight

### Acceptance Criteria
- [ ] Barcode scan works on Android Chrome and desktop Chrome
- [ ] Product data is retrieved from Open Food Facts and pre-fills the meal entry form
- [ ] If scan fails, UI gracefully falls back to photo or manual entry
- [ ] No new third-party dependencies that require API keys

---

## v1.3 — Multi-Day Meal Planning

**Goal**: Let users plan meals in advance and compare planned vs. actual intake.

### Features
- **Meal plan calendar** — 7-day ahead planning view
- **Template meals** — save frequently eaten meals as templates for quick re-logging
- **Planned vs. actual comparison** in Analytics

### Acceptance Criteria
- [ ] User can plan meals for future dates
- [ ] Planned meals appear in Analytics as a distinct series on the calorie trend chart
- [ ] Templates can be created from any logged meal
- [ ] All planned data is stored locally (no new storage dependencies)

---

## v1.4 — Health Platform Integration

**Goal**: Sync NutriVision data with Apple Health (iOS) and Google Fit (Android) for a unified health picture.

### Features
- **Apple Health** — write calorie and macro data via the Web Share API / HealthKit bridge (iOS PWA limitation: may require a native wrapper)
- **Google Fit** — write nutrition data via the Google Fit REST API (OAuth required)
- **Import step count** from either platform to auto-adjust activity level

### Technical Notes
- Apple HealthKit is not directly accessible from web PWAs on iOS — this may require a React Native wrapper or Capacitor
- Google Fit REST API is publicly available and works from browser apps with OAuth 2.0
- This is the first feature that introduces OAuth; careful implementation required to avoid storing refresh tokens insecurely

### Acceptance Criteria
- [ ] Google Fit sync works in Chrome on Android without installing a native app
- [ ] All OAuth tokens are stored in a way that doesn't introduce new security surface (session-only or encrypted storage)
- [ ] Sync is opt-in; zero impact on users who don't use it

---

## v2.0 — Optional Cloud Sync (Opt-In)

**Goal**: Let users who want it access their data across devices, without compromising the privacy-first design for everyone else.

### Design Principles
1. **Opt-in only** — the default remains fully local, zero-cloud
2. **End-to-end encrypted** — server stores only ciphertext; we cannot read your data
3. **Self-hostable** — publish the sync server spec so privacy-conscious users can run their own
4. **Graceful degradation** — if sync server is unavailable, app works 100% locally

### Architecture (Draft)
- E2E encryption: client generates keypair; private key never leaves device
- Sync format: encrypted JSON blobs; server is a dumb key-value store
- Conflict resolution: last-write-wins per meal ID (simple, good enough)
- Authentication: passphrase-derived key + optional TOTP

### Acceptance Criteria
- [ ] A user who never touches the sync setting experiences zero change
- [ ] A user who enables sync can access their data on a second device
- [ ] The server cannot decrypt any user data
- [ ] Self-hosting docs are published alongside the feature

---

## Ongoing / Perpetual

These improvements aren't version-gated — they're ongoing:

| Area | What's Needed |
|---|---|
| **Accessibility** | Full keyboard navigation; ARIA labels; colour contrast audit |
| **AI prompt quality** | Iterative improvements to Gemini prompt for edge cases (smoothies, mixed dishes, ethnic cuisines) |
| **Performance** | IndexedDB batch reads; memoisation for analytics; large meal log handling |
| **Testing** | Unit tests for `metabolicService.ts` and `analyticsService.ts`; integration tests for the Gemini flow |
| **Internationalisation** | Metric/imperial toggle; date format localisation |

---

## How to Contribute to the Roadmap

Want to help build one of these? 

1. Check if there's an open issue for the feature
2. Comment on it to signal intent before starting (avoids duplicate work)
3. Read [CONTRIBUTING.md](../CONTRIBUTING.md) for development setup and PR guidelines
4. Open a draft PR early so we can give feedback before you've written everything

**Most wanted right now**: tests for the metabolic service, accessibility improvements, and the manual food entry form.

---

## What's NOT on the Roadmap

To set expectations clearly:

| Feature | Why Not |
|---|---|
| Recipe database / meal library | Scope creep; better served by dedicated apps |
| Social features (sharing meals, leaderboards) | Against the privacy-first philosophy |
| Subscription model | We're not building a SaaS; this is open source |
| Macro recommendations / diet plans | We're not nutritionists; this is data, not advice |
| Wearable device sync (Fitbit, Garmin, etc.) | Fragmented APIs; significant maintenance burden |

---

*Roadmap is a living document. Items, priorities, and timelines will change as the project evolves.*
