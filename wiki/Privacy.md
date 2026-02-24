# Privacy

NutriVision was designed with one guiding principle: **your health data belongs to you, and only you.**

This page explains exactly what data the app handles, where it lives, and what (very little) leaves your device.

---

## The Short Version

- Everything is stored **locally on your device**
- The only thing that ever leaves your device is **the image** you send for food analysis
- There is **no backend**, no user accounts, no telemetry
- We cannot see your data. Physically cannot. There's nowhere for it to go.

---

## Full Data Inventory

### Data That Stays on Your Device (Always)

| Data | Storage Location | Description |
|---|---|---|
| **User profile** | `localStorage` key: `nutrivision_profile` | Age, sex, height, weight, activity level, targets, BMR, TDEE |
| **Meal logs** | `localStorage` key: `nutrivision_meals` | Meal timestamps, detected food items, macro totals, uncertainty ranges |
| **Meal photos** | `IndexedDB` store: `images` | JPEG/PNG blobs stored as Blob objects; keyed by meal ID |
| **Water logs** | `localStorage` key: `nutrivision_water` | Daily intake totals, keyed by local date string (YYYY-MM-DD) |
| **Gemini API key** | `localStorage` key: `gemini_api_key` | Your personal API key |

None of this data is synced to any server. It exists only in your browser's local storage for the app's origin.

### Data That Leaves Your Device (One Case Only)

| Data | Destination | What's Sent | What's Attached |
|---|---|---|---|
| **Meal photo (image pixels)** | Google Gemini API | Base64-encoded JPEG/PNG | Nothing — no user profile, no meal history, no identifying metadata |

When you tap **Analyse**, the app sends your image to the Google Gemini 1.5 Flash API. The request contains:
- The image bytes (Base64-encoded)
- A prompt string instructing the model to act as a dietitian
- A JSON response schema

**No user profile data is sent.** No name, no age, no weight, no meal history. Just pixels.

Google processes the image and returns a JSON response with the detected food items. The connection is HTTPS; the image is not stored by the app on any server after the API call completes.

---

## What We (The Developers) Can See

**Nothing.**

There is no backend. There is no analytics SDK (`window.gtag`, `segment`, `mixpanel`, etc.). There are no crash reporting beacons. We have deliberately not built any mechanism to receive your data, because we don't want the responsibility of storing health data.

This is a client-only application. Our only visibility into how the app is used comes from GitHub Stars and occasional issues. That's it.

---

## The API Key

Your Gemini API key is stored in `localStorage`. This means:

**Who can see it:**
- You (via your browser's DevTools → Application → Local Storage)
- Anyone with physical access to your unlocked device and browser

**Who cannot see it:**
- Us
- Anyone on the internet
- Any third party

The key is sent to Google's servers as a request header when you call the Gemini API — that's how the API works. It is not sent anywhere else.

**Recommendation**: Use a dedicated API key for NutriVision with quota limits configured in [Google AI Studio](https://aistudio.google.com/). If the key is ever compromised, you can revoke it there without affecting anything else.

---

## Google's Privacy Policy

When you use the Gemini API, Google processes your images according to their [Privacy Policy](https://policies.google.com/privacy) and the [Gemini API Additional Terms of Service](https://ai.google.dev/gemini-api/terms). Specifically:

- Google may use API input/output to improve their models unless you opt out
- You can configure this in Google AI Studio under API key settings
- Images sent via the API are not stored by Google beyond the request context (per their developer terms)

We recommend reviewing Google's current terms for the most up-to-date information.

---

## Browser Permissions Used

| Permission | Purpose | Required? |
|---|---|---|
| **Camera** (`getUserMedia`) | Live meal photo capture | No — file upload works instead |
| **Storage** (localStorage + IndexedDB) | All app data persistence | Yes |
| **Service Worker** | PWA offline caching | Granted automatically on install |
| **Notifications** | Not used | Never requested |
| **Location** | Not used | Never requested |
| **Microphone** | Not used | Never requested |

---

## Data Retention and Deletion

NutriVision has no automatic data retention policy because there is no server to enforce one. Your data persists until you:

1. **Delete individual meals** via the MealDetailModal (removes metadata from LocalStorage + blob from IndexedDB)
2. **Reset all data** via Settings → Reset (clears all LocalStorage keys and the IndexedDB store for this origin)
3. **Clear browser site data** manually via browser DevTools or Settings → Clear browsing data

There is no account to delete. There is no "right to erasure" request to submit. Just hit Reset.

---

## Third-Party Dependencies

NutriVision uses the following third-party libraries that run in the browser:

| Library | Purpose | Sends data externally? |
|---|---|---|
| `@google/genai` | Gemini API client | Yes — sends images to Google Gemini API |
| `react`, `react-dom` | UI framework | No |
| `recharts` | Charts | No |
| `lucide-react` | Icons | No |
| `tailwindcss` | Styling | No (compiled at build time) |
| `clsx`, `tailwind-merge` | CSS utilities | No |

No advertising SDKs. No analytics SDKs. No social media SDKs. Just libraries that help build the app.

---

## Offline Use

The PWA service worker caches all static assets after first load. The app is fully usable offline for:

- Viewing the Dashboard
- Browsing meal history
- Logging water
- Viewing Analytics
- Adjusting Settings

**Not available offline**: Food analysis (requires Gemini API call over the internet).

---

## Summary

| Question | Answer |
|---|---|
| Does NutriVision collect my health data? | No. It never leaves your device. |
| Does NutriVision track usage? | No analytics, no telemetry, no tracking. |
| Does NutriVision show ads? | No. There is no monetisation model. |
| Who can see my meal photos? | You, and Google's Gemini API (pixels only, during analysis). |
| Can I delete my data? | Yes, immediately, via Settings → Reset. |
| Do you store anything on a server? | No. There is no server. |

---

*If you have privacy-related concerns or questions, open an issue on [GitHub](https://github.com/Kaelith69/NutriVision/issues) or see [SECURITY.md](../SECURITY.md).*
