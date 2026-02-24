<div align="center">

<svg width="760" height="160" viewBox="0 0 760 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wikiHeroBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0B8F87;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2563EB;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="760" height="160" rx="12" fill="url(#wikiHeroBg)" />
  <text x="380" y="72" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#ffffff" text-anchor="middle">NutriVision Wiki</text>
  <text x="380" y="104" font-family="Arial, sans-serif" font-size="14" fill="#a7f3d0" text-anchor="middle">Everything you need to know. Even the things you didn't know you needed to know.</text>
  <text x="380" y="130" font-family="Arial, sans-serif" font-size="11" fill="#d1fae5" text-anchor="middle">React 18 · TypeScript · Google Gemini AI · PWA · Local-First</text>
</svg>

</div>

<br>

# Welcome to the NutriVision Wiki

NutriVision is an AI-powered nutrition tracking Progressive Web App. It uses Google Gemini 1.5 Flash to analyze photos of your meals and compute macros, while keeping all your data stored locally on your device.

No server. No cloud. No data broker selling your lunch history to insurance companies.

---

## 📚 Wiki Pages

| Page | Description |
|---|---|
| [Architecture](./Architecture.md) | System design, component map, storage strategy |
| [Installation](./Installation.md) | How to get it running locally and in production |
| [Usage](./Usage.md) | Feature walkthrough: logging, analytics, hydration, export |
| [Privacy](./Privacy.md) | Exactly what data goes where and why that matters |
| [Troubleshooting](./Troubleshooting.md) | Common issues and how to fix them |
| [Roadmap](./Roadmap.md) | What's coming next |

---

## 🚀 Quick Start

```bash
git clone https://github.com/Kaelith69/NutriVision.git
cd NutriVision
npm install
echo "VITE_GEMINI_API_KEY=your_key_here" > .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Complete onboarding. Point camera at food. Receive judgment.

---

## 🧩 Tech Summary

| Layer | Technology |
|---|---|
| UI Framework | React 18 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS |
| Charts | Recharts |
| AI Engine | Google Gemini 1.5 Flash (`@google/genai`) |
| Image Storage | IndexedDB (via `db.ts`) |
| Metadata Storage | `LocalStorage` |
| PWA | `vite-plugin-pwa` + Service Workers |
| Icons | Lucide React |

---

## 🔑 Key Concepts

**Local-First**: Every piece of data lives in your browser. Meal logs, photos, your profile — all of it stays on your device. The only external call is the photo sent to Gemini for AI analysis.

**Mifflin-St Jeor Equation**: The BMR formula used to calculate your base metabolic rate. It's not a guessing game — it's peer-reviewed science.

**Uncertainty Range**: Every AI analysis includes a ±20% calorie uncertainty range. The AI is confident, but not arrogant about it.

**PWA**: Installable on iOS and Android directly from your browser. Works offline after the first load.

---

## 📬 Issues & Contributing

- Found a bug? [Open an issue](https://github.com/Kaelith69/NutriVision/issues)
- Want to contribute? Read [CONTRIBUTING.md](https://github.com/Kaelith69/NutriVision/blob/main/CONTRIBUTING.md)
- Security concern? Read [SECURITY.md](https://github.com/Kaelith69/NutriVision/blob/main/SECURITY.md)
