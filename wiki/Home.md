<div align="center">

<img src="../docs/assets/hero-banner.svg" alt="NutriVision" width="820"/>

<br/>

# NutriVision Wiki

**Welcome to the official NutriVision documentation.**

</div>

---

NutriVision is an AI-powered nutrition tracking Progressive Web App. It uses Google Gemini 1.5 Flash computer vision to identify food from photos and calculate macros — with all data stored locally on your device. No cloud. No accounts. No judgment (well, some judgment — from the AI, about your macros).

---

## 📚 Wiki Pages

| Page | What's In It |
|---|---|
| **[Architecture](Architecture.md)** | System design, component overview, storage model |
| **[Installation](Installation.md)** | Local setup, environment config, deployment options |
| **[Usage](Usage.md)** | How to log meals, water, view analytics, export data |
| **[Privacy](Privacy.md)** | Data model, what leaves your device, what doesn't |
| **[Troubleshooting](Troubleshooting.md)** | Common issues and their actual solutions |
| **[Roadmap](Roadmap.md)** | Planned features, acceptance criteria, contribution opportunities |

---

## 🔑 Key Concepts

### Zero-Server Architecture
NutriVision has no backend. Your user profile, meal history, water logs, and photos are all stored in your browser's `localStorage` and `IndexedDB`. There is no database to breach, no server to go down, no subscription to cancel.

### Gemini AI Vision
Food analysis is performed by **Google Gemini 1.5 Flash**, a multimodal model capable of identifying food items from photos, estimating portion weights, and mapping those weights to macro/micronutrient data. The model is constrained to output strict JSON — no nutritional poetry, just numbers.

### Mifflin-St Jeor Metabolic Engine
Your daily calorie and macro targets are calculated using the **Mifflin-St Jeor equation**, the industry gold standard for estimating Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE).

### Progressive Web App (PWA)
NutriVision is installable on iOS and Android directly from the browser. A service worker caches assets for offline use. The shield icon sits next to your banking apps and makes you feel productive.

---

## 🚀 Quick Links

- [Main README](../README.md)
- [CONTRIBUTING.md](../CONTRIBUTING.md)
- [SECURITY.md](../SECURITY.md)
- [CHANGELOG.md](../CHANGELOG.md)
- [License (MIT)](../LICENSE)

---

## ⚡ TL;DR (For People Who Don't Read Documentation)

1. Set your profile → get your calorie/macro targets
2. Take a photo of food → AI identifies it → macros logged
3. Log water → stay hydrated, friend
4. Check Analytics → see how you're actually doing vs. how you think you're doing
5. Export CSV → feel like a data scientist

That's it. The rest of this wiki explains why steps 1–5 work the way they do.
