# Installation

This page covers everything you need to get NutriVision running — locally for development, and in production across every supported deployment target.

---

## Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| npm | 9+ | Included with Node.js |
| Google Gemini API Key | — | Free tier at [aistudio.google.com](https://aistudio.google.com/app/apikey) |
| Modern browser | — | Chrome, Firefox, Safari, Edge — anything built after 2020 |

---

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/Kaelith69/NutriVision.git
cd NutriVision
```

### 2. Install Dependencies

```bash
npm install
```

This installs React, Vite, Tailwind, Recharts, the Gemini SDK, and all dev dependencies. There are no optional dependencies. There are no mysteries.

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
echo "VITE_GEMINI_API_KEY=your_gemini_api_key_here" > .env
```

> **Important**: Never commit `.env` to source control. It's already in `.gitignore`. Don't fight it.

Your API key is available from [Google AI Studio](https://aistudio.google.com/app/apikey). The free tier is sufficient for personal use.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for Production (Optional)

```bash
npm run build
```

The output is in `dist/`. Preview it locally with:

```bash
npm run preview
```

---

## Production Deployment

NutriVision ships with pre-configured deployment files for all major platforms. Pick your poison.

### Option 1: Vercel (Recommended)

1. Push your fork to GitHub
2. Connect the repo at [vercel.com/new](https://vercel.com/new)
3. Set the environment variable `VITE_GEMINI_API_KEY` in the Vercel dashboard under **Settings → Environment Variables**
4. Deploy

The `vercel.json` configuration is already included in the repo.

### Option 2: Netlify

1. Connect the repo at [app.netlify.com](https://app.netlify.com/)
2. Set `VITE_GEMINI_API_KEY` in **Site settings → Environment variables**
3. Deploy

The `netlify.toml` configuration is already included.

### Option 3: Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

The `firebase.json` and `.firebaserc` configs are already included.

### Option 4: GitHub Pages

Push to the `main` branch. The included GitHub Actions workflow (`.github/workflows/`) handles the build and publish automatically. Ensure `VITE_GEMINI_API_KEY` is set as a GitHub Actions secret in your repository settings.

### Option 5: Surge.sh (Fastest Option)

```bash
./deploy_online.sh
```

Deploys to a free public Surge URL in under 30 seconds. Requires `surge` to be installed (`npm install -g surge`).

---

## Environment Variable Reference

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | ✅ Yes | Your Google Gemini API key. Without this, AI analysis will not work. |

> **Note**: Vite requires environment variables to be prefixed with `VITE_` to be accessible in the client bundle. This is intentional.

---

## Restricting Your API Key

For production deployments, restrict your Gemini API key to your deployment domain to prevent unauthorized use:

1. Go to [Google AI Studio](https://aistudio.google.com/) → API Keys
2. Edit your key and add an HTTP referrer restriction for your deployment URL (e.g., `https://nutrivision.vercel.app/*`)

This doesn't affect local development (where no restriction applies by default).

---

## Post-Install Verification

After installation, verify the app is working:

1. Open the app in a browser
2. Complete the onboarding form
3. Navigate to the Camera tab
4. Upload any food photo
5. Verify that macro data is returned within a few seconds

If the analysis fails with an error, check that your `VITE_GEMINI_API_KEY` is set correctly.
