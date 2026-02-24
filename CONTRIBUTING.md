# Contributing to NutriVision

First off — thank you for considering a contribution. You're either here because you love free software, because you found a bug, or because you want to add "open source contributor" to your LinkedIn. All equally valid.

---

## 🐛 Found a Bug?

Congratulations. You are now part of the development team.

Please [open an issue](https://github.com/Kaelith69/NutriVision/issues/new) and include:

- **What you expected to happen** (your naive, optimistic worldview)
- **What actually happened** (cold, hard reality)
- **Steps to reproduce** (precise enough that a sleep-deprived developer can follow them at 2 AM)
- **Your environment**: OS, browser, browser version, device type

If you can reproduce it in a minimal test case, you are a hero of the highest order.

---

## 💡 Have a Feature Idea?

Open a [feature request issue](https://github.com/Kaelith69/NutriVision/issues/new). Describe the problem it solves, not just the solution you have in mind. "Add dark mode" is fine. "Redesign the entire app in my preferred aesthetic" requires a conversation.

---

## 🛠️ Want to Write Code?

### Setup

```bash
git clone https://github.com/Kaelith69/NutriVision.git
cd NutriVision
npm install
echo "VITE_GEMINI_API_KEY=your_key_here" > .env
npm run dev
```

### Workflow

1. **Fork** the repository
2. **Create a branch** with a meaningful name:
   ```bash
   git checkout -b feat/barcode-scanner
   git checkout -b fix/water-log-timezone
   ```
3. **Make your changes** — small, focused, readable
4. **Test manually** — open the app, click around, make sure you haven't broken something unrelated
5. **Commit** with a clear message:
   ```
   feat: add barcode scanner for packaged foods
   fix: correct water log date key for UTC-negative timezones
   docs: add IndexedDB schema to Architecture wiki
   ```
6. **Push** and open a Pull Request

### Code Style

- TypeScript everywhere. No `any` unless you have a *very* good excuse and are prepared to defend it.
- Components go in `src/components/`. Services go in `src/services/`. If you're not sure where something belongs, it probably belongs in a service.
- Keep components stateless where possible. Lift state to `App.tsx` for anything that needs to persist.
- Use `lucide-react` for icons. We already have it. Don't add a second icon library to save one SVG.
- TailwindCSS for styling. Avoid custom CSS unless Tailwind genuinely can't do the thing.

### What We Love

- Bug fixes with a clear explanation of the root cause
- Performance improvements with before/after measurements
- Accessibility improvements (keyboard nav, ARIA labels, contrast)
- New AI prompt improvements that increase accuracy
- Tests (we don't have many; help is welcome)

### What We'll Politely Decline

- Dependencies that balloon `node_modules` for marginal benefit
- UI redesigns without prior discussion
- Changes that break the zero-server privacy model (adding analytics SDKs, beacons, etc.)
- "Refactors" that change everything and fix nothing

---

## 📋 Pull Request Checklist

Before submitting, confirm:

- [ ] The app runs locally without errors (`npm run dev`)
- [ ] The production build succeeds (`npm run build`)
- [ ] Your change does what the PR description says
- [ ] You haven't accidentally committed your `.env` file (we've all done it once)
- [ ] The PR description explains *why*, not just *what*

---

## 🤝 Code of Conduct

Be kind. Be helpful. Disagree professionally. Don't be weird about it.

We're all here because we like building things. Let's keep it that way.

---

*Contributing is caring. Thank you.*
