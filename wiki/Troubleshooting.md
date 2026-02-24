# Troubleshooting

Common problems, their actual causes, and their actual solutions. No "have you tried turning it off and on again" without context.

---

## App Issues

### Blank screen on load

**Symptom**: The page loads but shows nothing, or a white/dark screen.

**Cause 1 — Missing API key in production**
The most common cause. Vite embeds environment variables at build time. If `VITE_GEMINI_API_KEY` wasn't set when the build ran, the variable is undefined.

**Fix**: Add the environment variable in your hosting provider's dashboard and **redeploy**:
- Vercel: Settings → Environment Variables → Add `VITE_GEMINI_API_KEY`
- Netlify: Site Settings → Build & deploy → Environment Variables
- GitHub Pages: Repository Settings → Secrets and variables → Actions

**Cause 2 — Corrupt localStorage data**
If the stored JSON is malformed (can happen after an interrupted write), the app's state initialisation throws on parse.

**Fix**: Open browser DevTools → Application → Local Storage → find entries starting with `nutrivision_` and delete them. Reload the page.

**Cause 3 — Build artefact served with wrong MIME type**
Some static hosts serve `.js` files as `text/plain` when misconfigured.

**Fix**: Ensure your host is configured for SPA routing and serves the correct MIME types. The included `vercel.json`, `netlify.toml`, and `firebase.json` handle this automatically for their respective platforms.

---

### Camera doesn't work

**Symptom**: Tapping "Use Camera" does nothing, shows an error, or the browser never asks for camera permission.

**Cause**: `getUserMedia` (the browser camera API) requires a **secure context** — either `localhost` or an `https://` URL.

**Fix**:
- In development: use `http://localhost:5173` (already secure context), not `http://192.168.x.x:5173`
- In production: ensure your deployment is served over HTTPS (all major hosting providers do this by default)

**Also check**: Browser permissions. If you previously denied camera access for the domain, the browser won't ask again. Go to browser Settings → Site permissions → Camera → find the app's URL and reset to "Ask".

---

### Food analysis returns no results or an error

**Symptom**: After uploading/capturing a photo and tapping Analyse, the app shows an error or returns empty results.

**Cause 1 — Invalid or expired API key**

**Fix**: Go to Settings → update your Gemini API key. Verify the key is valid in [Google AI Studio](https://aistudio.google.com/).

**Cause 2 — Gemini API quota exceeded**

**Fix**: Check your quota usage in Google AI Studio. The free tier has rate limits. If you're hitting limits during normal use, consider upgrading or adding quota.

**Cause 3 — Image too large**

Gemini has a maximum inline image size. Very large images (e.g., RAW photos or uncompressed PNGs) may exceed the limit.

**Fix**: Use a standard JPEG from your phone's camera. Most mobile cameras output images well within Gemini's limits.

**Cause 4 — Network error**

**Fix**: Check your internet connection. Food analysis requires an active connection to the Gemini API.

---

### AI macro estimates seem wrong

**This is expected behaviour, not a bug.**

Gemini 1.5 Flash performs volumetric estimation from image pixels. It's doing actual nutritional science from a 2D image. It's good, but it's not infallible.

**What affects accuracy**:
- Image angle (top-down is best)
- Lighting (better light = clearer food recognition)
- Portion visibility (if food is hidden under sauce, the AI can't see it either)
- Scale context (providing a reference object helps calibrate estimates)

Every meal log includes an **±20% uncertainty range** for this reason.

**What to do**: Use the MealDetailModal to correct individual items. Edited items are flagged as `isUserCorrected: true` in your data.

---

### Water log shows incorrect date

**Symptom**: Water logged at 11:50 PM appears under the wrong date, or logs jump to a new date unexpectedly.

**Cause**: Water logs are keyed by local date (YYYY-MM-DD format, using `new Date().toLocaleDateString()`). If your device's timezone is unusual or changes (e.g., DST transition, international travel), the date key may shift.

**This is a known limitation**, not a data loss issue. Your water data is still there, just on a different date key.

**Workaround**: This is cosmetic only. No fix currently, but it's on the roadmap for proper timezone-aware date handling.

---

### Meal photos don't load (broken image thumbnails)

**Symptom**: Meal log shows a broken image icon instead of the food photo.

**Cause**: The IndexedDB blob was deleted (browser storage cleanup, site data clear) but the meal metadata in LocalStorage still references it.

**Fix**: This is cosmetic — your macro data is intact. If you want to clean up broken entries, go to Settings → Reset (wipes everything) or delete individual meals via the MealDetailModal.

---

### App data disappeared after browser update

**Cause**: Some browsers clear site data during major updates, or if "clear cookies and site data on close" is enabled in browser settings.

**Prevention**: Export your data regularly via the Export button. The `.csv` file is your backup.

**Fix**: Once data is cleared, it's gone — there's no cloud backup to restore from (by design). Start fresh with the onboarding form.

---

### App is slow or laggy

**Symptom**: Animations are janky, the app is slow to respond.

**Likely cause**: A very large meal log (hundreds of entries) with many IndexedDB reads happening simultaneously.

**Fix**: Export your data and delete old meals via the Settings → Reset flow, or delete individual old entries. The app is optimised for typical daily use (weeks to months of history), not multi-year archives.

---

## Development Issues

### `npm install` fails

```
npm ERR! code ERESOLVE
```

**Fix**: Ensure you're using Node.js ≥ 18:

```bash
node --version    # should be 18.x or higher
npm --version     # should be 9.x or higher
```

If you have multiple Node versions, use [nvm](https://github.com/nvm-sh/nvm):
```bash
nvm use 18
npm install
```

---

### `npm run build` fails with TypeScript errors

**Fix**: Run `npx tsc --noEmit` to see the full list of type errors. Fix them before building. The build is intentionally strict (`strict: true` in `tsconfig.json`).

---

### Vite dev server crashes immediately

```
Error: Cannot find module ...
```

**Fix**: Dependencies may be missing or mismatched. Try:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Changes to `vite.config.ts` break the PWA

The `vite-plugin-pwa` configuration is sensitive to changes in `outDir` and `publicDir`. If you modify the Vite config:
- Delete `dist/` before rebuilding
- Clear browser cache and unregister the service worker in DevTools → Application → Service Workers

---

## Getting More Help

If your issue isn't listed here:

1. Check the [GitHub Issues](https://github.com/Kaelith69/NutriVision/issues) — someone may have hit it before
2. Open a new issue with:
   - Your OS and browser + version
   - Steps to reproduce
   - What you expected vs. what happened
   - Any console errors (DevTools → Console)

We'll get to it when we can. We are not a support team — we're developers who also eat food.
