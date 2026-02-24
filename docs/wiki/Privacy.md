# Privacy

NutriVision was designed from the ground up to keep your data on your device. This page explains exactly what data the app collects, stores, and transmits — and what it doesn't.

---

## The Short Version

Your data stays on your device. The **only** external network call is the meal photo sent to Google Gemini for AI analysis. Nothing else leaves your browser. Ever.

---

## Data Inventory

<div align="center">

<svg width="680" height="340" viewBox="0 0 680 340" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="privBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="680" height="340" rx="12" fill="url(#privBg)" />
  <text x="340" y="34" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">Data Storage Map</text>

  <!-- Headers -->
  <text x="120" y="62" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Data Type</text>
  <text x="300" y="62" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Storage</text>
  <text x="480" y="62" font-family="Arial, sans-serif" font-size="11" fill="#94a3b8" text-anchor="middle">Leaves Device?</text>
  <line x1="20" y1="68" x2="660" y2="68" stroke="#334155" stroke-width="1" />

  <!-- Row 1 -->
  <text x="120" y="92" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">User Profile</text>
  <text x="300" y="92" font-family="Arial, sans-serif" font-size="11" fill="#a5b4fc" text-anchor="middle">LocalStorage</text>
  <text x="480" y="92" font-family="Arial, sans-serif" font-size="11" fill="#10B981" text-anchor="middle">❌ Never</text>

  <!-- Row 2 -->
  <text x="120" y="122" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">Meal Log Metadata</text>
  <text x="300" y="122" font-family="Arial, sans-serif" font-size="11" fill="#a5b4fc" text-anchor="middle">LocalStorage</text>
  <text x="480" y="122" font-family="Arial, sans-serif" font-size="11" fill="#10B981" text-anchor="middle">❌ Never</text>

  <!-- Row 3 -->
  <text x="120" y="152" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">Meal Photos</text>
  <text x="300" y="152" font-family="Arial, sans-serif" font-size="11" fill="#a5b4fc" text-anchor="middle">IndexedDB</text>
  <text x="480" y="152" font-family="Arial, sans-serif" font-size="11" fill="#10B981" text-anchor="middle">❌ Never</text>

  <!-- Row 4 -->
  <text x="120" y="182" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">Water Logs</text>
  <text x="300" y="182" font-family="Arial, sans-serif" font-size="11" fill="#a5b4fc" text-anchor="middle">LocalStorage</text>
  <text x="480" y="182" font-family="Arial, sans-serif" font-size="11" fill="#10B981" text-anchor="middle">❌ Never</text>

  <!-- Row 5 (highlight) -->
  <rect x="20" y="196" width="640" height="32" rx="4" fill="#0B8F87" opacity="0.15" />
  <text x="120" y="217" font-family="Arial, sans-serif" font-size="11" fill="#fcd34d" text-anchor="middle">Meal Photo (AI scan)</text>
  <text x="300" y="217" font-family="Arial, sans-serif" font-size="11" fill="#fcd34d" text-anchor="middle">Google Gemini API (HTTPS)</text>
  <text x="480" y="217" font-family="Arial, sans-serif" font-size="11" fill="#fbbf24" text-anchor="middle">⚡ One-time, per analysis</text>

  <!-- Row 6 -->
  <text x="120" y="252" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">Analytics / Telemetry</text>
  <text x="300" y="252" font-family="Arial, sans-serif" font-size="11" fill="#a5b4fc" text-anchor="middle">None</text>
  <text x="480" y="252" font-family="Arial, sans-serif" font-size="11" fill="#10B981" text-anchor="middle">❌ Not collected</text>

  <!-- Row 7 -->
  <text x="120" y="282" font-family="Arial, sans-serif" font-size="11" fill="#e2e8f0" text-anchor="middle">Cookies / Tracking</text>
  <text x="300" y="282" font-family="Arial, sans-serif" font-size="11" fill="#a5b4fc" text-anchor="middle">None</text>
  <text x="480" y="282" font-family="Arial, sans-serif" font-size="11" fill="#10B981" text-anchor="middle">❌ Not used</text>

  <text x="340" y="320" font-family="Arial, sans-serif" font-size="9" fill="#475569" text-anchor="middle">⚡ = only your meal photo, only when you explicitly trigger AI analysis</text>
</svg>

</div>

<br>

---

## What Stays Local

### LocalStorage

The following data is stored in your browser's `LocalStorage` and never transmitted anywhere:

- **UserProfile** — age, biological sex, height, weight, activity level, target weight, calculated BMR/TDEE
- **MealLog entries** — timestamps, food item names, macro totals, uncertainty ranges, meal IDs
- **WaterLog entries** — date and amount in ml

LocalStorage is scoped to the app's origin. Other websites cannot access it.

### IndexedDB

**Meal photos** are stored in IndexedDB as binary blobs via the `db.ts` service module. This provides crash-resistant, quota-efficient storage for large assets that would overflow LocalStorage.

Like LocalStorage, IndexedDB is origin-scoped. Nothing leaves your device.

---

## What Leaves Your Device

### The Gemini API Call

When you trigger a meal analysis, the **photo you selected** is Base64-encoded and sent over HTTPS to the Google Gemini 1.5 Flash API. This is the only external network request the app makes.

What is **included** in this request:
- The meal photo (Base64-encoded)
- The JSON schema prompt (instructions for the AI on what to return)
- Your Gemini API key (in the Authorization header)

What is **not included**:
- Your name or any personally identifiable information
- Your weight, age, or profile data
- Any previous meal history
- Your location

Google's handling of data sent to the Gemini API is governed by their [Privacy Policy](https://policies.google.com/privacy) and [AI Principles](https://ai.google/principles/).

---

## Data Deletion

To delete all NutriVision data:

1. Open your browser's developer tools
2. Navigate to **Application → Storage**
3. Clear **LocalStorage** and **IndexedDB** for the app's origin

Or, in most browsers, clearing site data from the browser settings will accomplish the same thing.

There is no account to delete, no server-side data to request removal of, and no support ticket to file. The data is yours, on your machine.

---

## No Analytics, No Telemetry

NutriVision does not include:
- Analytics (Google Analytics, Mixpanel, Amplitude, etc.)
- Error tracking (Sentry, Bugsnag, etc.)
- Session recording (Hotjar, FullStory, etc.)
- Any advertising or marketing SDKs

This is not a compliance decision — it's a design decision. The app doesn't need to know how you use it.

---

## API Key Security

Your Gemini API key is stored as a `VITE_` environment variable and embedded in the built JavaScript bundle. This is standard practice for client-side PWAs without a backend-for-frontend.

Recommendations:
1. **Restrict your API key** to your deployment domain in [Google AI Studio](https://aistudio.google.com/) to prevent unauthorized use if the key is extracted from the bundle.
2. **Never commit `.env`** to source control. The `.gitignore` already prevents this.
3. **Monitor usage** in Google AI Studio for any unexpected API calls.
