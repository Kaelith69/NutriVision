# Contributing to NutriVision

First of all: thank you. You're looking at this file, which means you care enough to contribute, which puts you in the top 10% of internet users already.

---

## 🐛 Found a Bug?

Congratulations — you are now part of the development team. Please don't leave.

Open an issue with:
- **What you expected to happen** (the dream)
- **What actually happened** (the nightmare)
- **Steps to reproduce** (the breadcrumbs that lead us back to the scene of the crime)
- **Browser and OS** — yes, it matters. No, "my computer" is not enough.

---

## 💡 Have a Feature Idea?

Open a discussion or issue tagged `enhancement`. If the idea is good, we'll build it. If it's wild, we'll... probably still build it, but slower.

Bonus points if your feature request includes a sketch, a mermaid diagram, or anything that isn't just "make it better."

---

## 🛠️ Making a Code Contribution

### Setup

```bash
git clone https://github.com/Kaelith69/NutriVision.git
cd NutriVision
npm install
echo "VITE_GEMINI_API_KEY=your_key" > .env
npm run dev
```

### Ground Rules

1. **Fork the repo** — don't push directly to `main`. That's how chaos starts.
2. **Create a feature branch** — `git checkout -b feat/your-cool-feature`
3. **Write clean TypeScript** — If TypeScript is screaming at you, it's not wrong. You are.
4. **Test your changes** — Open the app, click the things, make sure nothing explodes.
5. **Keep PRs focused** — One feature or fix per PR. A PR that touches 47 files and "fixes everything" will be closed faster than a browser with 200 tabs.

### Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
feat: add barcode scanner for packaged foods
fix: prevent water log from resetting at midnight in UTC+14
docs: update architecture diagram
refactor: simplify geminiService response parsing
```

### Pull Request Checklist

Before opening a PR, make sure:

- [ ] `npm run build` succeeds without errors
- [ ] The app actually runs (`npm run dev`)
- [ ] Your changes don't break any existing features
- [ ] You haven't committed `.env` or any API keys
- [ ] Your code is formatted consistently with the rest of the codebase

---

## 🏗️ Code Architecture Overview

Key areas you'll interact with:

| File | Purpose |
|---|---|
| `src/services/geminiService.ts` | Gemini AI API calls — handle with care |
| `src/services/metabolicService.ts` | BMR/TDEE/macro math — don't change formulas without citations |
| `src/services/db.ts` | IndexedDB wrapper — image blob storage |
| `src/components/CameraModule.tsx` | Photo capture + AI analysis trigger |
| `src/components/Analytics.tsx` | 14-day charts and CSV export |
| `src/types.ts` | All TypeScript interfaces — start here when in doubt |

---

## 🚫 What NOT to Do

- Don't add a backend. The whole point is zero-server, local-first privacy.
- Don't add tracking, analytics, or telemetry. We don't want to know. Really.
- Don't change the Mifflin-St Jeor formula unless you have a peer-reviewed paper handy.
- Don't add dependencies "just because they're cool." Every byte counts in a PWA.

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).

---

*Thanks for contributing. Your future self (with a better macro breakdown) thanks you too.*
