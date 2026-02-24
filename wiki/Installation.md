# Installation

This page covers everything you need to get NutriVision running locally, configure it, and deploy it.

---

## Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| **Node.js** | ≥ 18.x | Required for `npm` and Vite |
| **npm** | ≥ 9.x | Comes with Node.js |
| **Google Gemini API key** | — | Free tier available at [aistudio.google.com](https://aistudio.google.com) |
| **Modern browser** | Any recent Chrome / Firefox / Safari / Edge | Required for IndexedDB and camera access |

You do **not** need Docker, a database, or any cloud credentials beyond the Gemini API key.

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Kaelith69/NutriVision.git
cd NutriVision
```

### 2. Install Dependencies

```bash
npm install
```

This installs approximately 300 packages. Most of them are Vite's problem, not yours.

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> **Where to get a key**: Visit [Google AI Studio](https://aistudio.google.com/), create a project, and generate an API key. The free tier is sufficient for personal use.

> **Alternative**: If you skip this step, the app will ask for your API key during the onboarding flow and store it in `localStorage`. Either approach works.

### 4. Start the Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 5. Complete Onboarding

On first launch, you'll see the onboarding form. Enter your:
- Age, biological sex, height, weight
- Current activity level
- Target weight (optional but used for goal context)

The app calculates your BMR, TDEE, and daily macro targets immediately. You can change these at any time in Settings.

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Recommended | Gemini API key. If omitted, the app asks at runtime. |

There are no other environment variables. We told you this was simple.

---

## Production Build

```bash
npm run build        # outputs to dist/
npm run preview      # serve the dist/ folder locally to test
```

The `dist/` folder contains the fully built app, ready to deploy to any static hosting provider.

---

## Deployment Options

### Option A: Vercel (Recommended — Easiest)

1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com), connect your GitHub account
3. Import the `NutriVision` repo
4. Under **Environment Variables**, add `VITE_GEMINI_API_KEY`
5. Deploy

Vercel auto-detects Vite and configures the build correctly. A `vercel.json` is included in the repo for SPA routing.

### Option B: Netlify

1. Connect your GitHub repo at [netlify.com](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add `VITE_GEMINI_API_KEY` under Site Settings → Environment Variables
5. Deploy

A `netlify.toml` is included with the correct redirect rules for SPA routing.

### Option C: Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # select dist/ as the public directory, configure as SPA
npm run build
firebase deploy
```

A `.firebaserc` and `firebase.json` are included in the repo.

### Option D: GitHub Pages

Push to the `main` branch. The included `.github/workflows/production.yml` workflow builds and deploys automatically to GitHub Pages.

> Note: Set `VITE_GEMINI_API_KEY` as a **GitHub Actions secret** (Settings → Secrets → Actions → New repository secret).

### Option E: Surge.sh (30-second Deploy)

```bash
./deploy_online.sh
```

This script builds the app and deploys it to a public Surge.sh URL. Requires `npm install -g surge` on first use.

### Option F: Any Static Host

Run `npm run build` and upload the `dist/` folder to any static hosting provider (S3, GitHub Pages manual, Render, Fly.io static, etc.). It's just HTML, CSS, and JS.

---

## Updating

```bash
git pull origin main
npm install          # in case dependencies changed
npm run build        # if deploying
```

---

## Resetting App Data

If you need a clean slate (e.g., after testing):

1. Open the app → Settings
2. Scroll to the bottom → **Reset All Data**
3. Confirm — this wipes `localStorage` and IndexedDB for the app's origin

Alternatively, clear site data directly in your browser's DevTools → Application → Storage.

---

## Troubleshooting Installation Issues

| Problem | Solution |
|---|---|
| `npm install` fails | Ensure Node.js ≥ 18: `node --version` |
| Blank screen after deploy | Check that `VITE_GEMINI_API_KEY` is set in your host's environment variables |
| Camera not working | Ensure the app is served over HTTPS (required for `getUserMedia`) |
| App works locally but not on deploy | Check browser console for 404 errors — verify SPA redirect rules are configured |

See [Troubleshooting](Troubleshooting.md) for more detail.
