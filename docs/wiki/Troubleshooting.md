# Troubleshooting

Something's broken? Great. This page exists for exactly that situation. Work through the relevant section below before opening an issue.

---

## Blank Screen on Load

**Symptom**: The app loads but shows nothing. Just vibes.

**Most likely cause**: Your `VITE_GEMINI_API_KEY` environment variable is missing or incorrectly set.

**Fix**:
1. Check your `.env` file in the project root:
   ```
   VITE_GEMINI_API_KEY=your_key_here
   ```
2. If deploying to Vercel, Netlify, Firebase, or GitHub Pages — ensure the variable is set in the platform's environment variable settings, **not** just in `.env`.
3. Rebuild and redeploy after setting the variable. Vite bakes environment variables into the bundle at build time.

---

## AI Analysis Fails or Returns an Error

**Symptom**: You upload a photo, the spinner runs, then an error appears.

**Possible causes and fixes**:

| Symptom | Likely Cause | Fix |
|---|---|---|
| "API key invalid" error | Wrong or revoked key | Check [aistudio.google.com](https://aistudio.google.com/) and verify the key |
| "Quota exceeded" error | Free tier limit reached | Wait for quota reset or upgrade your API plan |
| "Network error" | Offline or firewall | Check your internet connection |
| Empty response from AI | Image too dark/blurry | Try a better-lit, clearer photo |
| Parsing error | AI returned unexpected format | This is rare — retry the analysis |

---

## Meal Photos Not Displaying

**Symptom**: Meal logs show but photos are missing or broken.

**Cause**: IndexedDB data may have been cleared (browser data clear, private/incognito session, or browser quota management).

**Notes**:
- Meal photos stored in IndexedDB can be evicted by the browser under storage pressure. This is a browser behavior, not a bug.
- In private/incognito mode, IndexedDB data is discarded when the session ends.
- Meal macro data (stored in LocalStorage) is more durable than the photos.

**Fix**: If photos are gone, they're gone. The macro data is preserved. Future mitigation: use the app in a normal (non-private) browser session, and ensure the browser has sufficient storage.

---

## My Data is Gone

**Symptom**: All meal logs, profile data, and water logs have vanished.

**Most likely cause**: Browser storage was cleared — either manually, by a browser update, or by the browser's storage quota manager.

**Prevention**:
- Use the **CSV export** feature regularly to back up your meal history
- Avoid clearing browser data for the app's origin
- Don't use private/incognito mode if you want data to persist

**Recovery**: If LocalStorage was cleared, the data cannot be recovered. There is no server backup. This is the tradeoff of a local-first, zero-backend design.

---

## App Not Installing as PWA

**Symptom**: The "Add to Home Screen" or "Install App" prompt never appears.

**Requirements for PWA install**:
- The site must be served over **HTTPS** (not HTTP). `localhost` is an exception and works fine.
- You must visit the site in a supported browser (Chrome, Edge, Safari on iOS).
- The service worker must be registered successfully.

**Fix**:
1. Ensure your deployment uses HTTPS. All major hosting platforms (Vercel, Netlify, Firebase) provide this automatically.
2. On iOS, use **Safari** specifically — Chrome on iOS does not support PWA install.
3. Open the browser's developer tools → **Application → Service Workers** and verify the service worker is registered and active.

---

## Offline Mode Not Working

**Symptom**: The app doesn't load when offline after being installed.

**Cause**: The service worker may not have cached all assets on first load.

**Fix**:
1. Open the app while online
2. Wait for the page to fully load (all assets cached)
3. Try going offline — the app should now load from cache

If the service worker is stuck or outdated, hard-refresh the page while online:
- Chrome/Edge: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
- Or open DevTools → **Application → Service Workers → Update**

---

## Water Target Seems Wrong

**Symptom**: The daily water target looks too high or too low.

**How the target is calculated**:
```
Base = weight (kg) × 35 ml
Activity bonus = ~500 ml per activity tier above Sedentary
Total = Base + Activity bonus
```

Activity tiers above Sedentary:
- Lightly Active: +500 ml
- Moderately Active: +1000 ml
- Very Active: +1500 ml
- Extremely Active: +2000 ml

If the target seems wrong, verify your **weight** and **activity level** in the Settings tab.

---

## Calorie Target Doesn't Match My Expectations

**Symptom**: The daily calorie target seems too low or too high.

**How it's calculated**:
1. **BMR** = (10 × weight kg) + (6.25 × height cm) − (5 × age) + sex offset (+5 male / −161 female)
2. **TDEE** = BMR × activity multiplier (1.2 to 1.9)
3. **Daily target** = TDEE adjusted toward your target weight (deficit for weight loss, surplus for gain)

If the number surprises you, double-check your inputs in **Settings**. Small errors in weight or height produce noticeable differences in output.

---

## Build Fails Locally

**Symptom**: `npm run build` exits with an error.

**Common causes**:

| Error | Fix |
|---|---|
| TypeScript errors | Run `npx tsc --noEmit` to see detailed errors, fix them |
| Missing `node_modules` | Run `npm install` |
| Wrong Node.js version | Use Node.js 18+ (`node --version`) |
| `VITE_GEMINI_API_KEY` not set | Add it to `.env` — Vite may reference it at build time |

---

## Still Stuck?

1. Check the [GitHub Issues](https://github.com/Kaelith69/NutriVision/issues) to see if someone else hit the same problem
2. Open a new issue with:
   - Your browser and OS
   - What you were doing when it broke
   - Any error messages from the browser console (F12 → Console)
   - Steps to reproduce
