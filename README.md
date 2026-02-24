<div align="center">

<svg width="900" height="200" viewBox="0 0 900 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0B8F87;stop-opacity:1" />
      <stop offset="60%" style="stop-color:#065f5a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2563EB;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#10B981;stop-opacity:0" />
      <stop offset="50%" style="stop-color:#10B981;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#10B981;stop-opacity:0" />
    </linearGradient>
  </defs>
  <rect width="900" height="200" rx="16" fill="url(#heroBg)" />
  <rect x="60" y="152" width="780" height="2" fill="url(#accentLine)" />
  <!-- Shield icon -->
  <path d="M80 60 L80 100 Q80 130 110 140 Q140 130 140 100 L140 60 L110 50 Z" fill="none" stroke="#10B981" stroke-width="3" />
  <path d="M95 90 L107 102 L128 78" fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <!-- Title -->
  <text x="165" y="95" font-family="Arial, sans-serif" font-size="42" font-weight="bold" fill="#ffffff" letter-spacing="2">NutriVision</text>
  <text x="165" y="130" font-family="Arial, sans-serif" font-size="18" fill="#10B981" letter-spacing="4">AI-POWERED NUTRITION INTELLIGENCE</text>
  <!-- Decorative dots -->
  <circle cx="820" cy="50" r="4" fill="#10B981" opacity="0.6" />
  <circle cx="840" cy="70" r="3" fill="#2563EB" opacity="0.5" />
  <circle cx="855" cy="45" r="5" fill="#10B981" opacity="0.4" />
  <circle cx="870" cy="80" r="2" fill="#ffffff" opacity="0.3" />
  <circle cx="830" cy="95" r="3" fill="#10B981" opacity="0.5" />
  <text x="450" y="178" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">"This thing reads your lunch faster than you read error messages."</text>
</svg>

</div>

<br>

# NutriVision AI

<div align="center">

[![Status](https://img.shields.io/badge/Status-OPERATIONAL-10B981?style=for-the-badge&labelColor=0B8F87)](https://github.com/Kaelith69/NutriVision)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=20232A)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini_1.5_Flash-AI-7C3AED?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![PWA](https://img.shields.io/badge/PWA-Offline_Ready-10B981?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-2563EB?style=for-the-badge)](./LICENSE)

</div>

<br>

**NutriVision** is an AI-powered nutrition tracker that analyzes photos of your food using Google Gemini 1.5 Flash, computes your macros in seconds, and stores everything **locally on your device**. No cloud. No subscriptions. No server that "accidentally" leaks your burrito history.

It calculates your personal metabolic targets using the Mifflin-St Jeor equation, tracks water intake, visualizes 14-day trends, and exports your data to CSV. All of it runs in your browser as a PWA — offline, private, and fast.

<br>

<div align="center">

![Developer trying to track macros manually](https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif)

*You, manually counting calories before discovering NutriVision.*

</div>

<br>

---

## 🧭 System Overview

| Property | Detail |
|---|---|
| **AI Model** | Google Gemini 1.5 Flash |
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite |
| **Charts** | Recharts |
| **Storage** | IndexedDB (images) + LocalStorage (metadata) |
| **Platform** | Web PWA — installable on iOS & Android |
| **Backend** | None. Zero. Zilch. Nada. |
| **Privacy** | 100% local-first |

---

## ✨ Features

- 📸 **AI Food Photo Analysis** — Snap a photo, get calories + macros in ~2 seconds. The AI outputs strict JSON. No haiku about your salad.
- 🧮 **Metabolic Calculations** — BMR via Mifflin-St Jeor, TDEE with activity multipliers (1.2–1.9), and smart macro targets (Protein: 1.8g/kg, Fat: 0.8g/kg).
- 💧 **Hydration Tracking** — Dynamic daily water targets: 35ml/kg base + ~500ml per activity tier above sedentary.
- 📊 **14-Day Analytics Dashboard** — Trend charts, macro breakdowns, system alerts for deficiencies or surpluses.
- 📤 **CSV Export** — Because you're definitely making pivot tables.
- 📱 **PWA / Offline Support** — Service workers cache assets. Works on iOS and Android. Loads faster than your excuses.
- 🔒 **100% Local Storage** — Meal images in IndexedDB. Metadata in LocalStorage. Nothing leaves your device.
- 🔄 **Onboarding & Settings** — Profile setup (age, sex, height, weight, activity level, target weight) with live recalculation.

<br>

---

## 📊 Capability Graph

<div align="center">

<svg width="720" height="380" viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="capBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="barGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0B8F87;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#10B981;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="barGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2563EB;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#60a5fa;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="720" height="380" rx="12" fill="url(#capBg)" />
  <text x="360" y="38" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">Feature Capability Overview</text>

  <!-- Feature rows -->
  <!-- AI Analysis -->
  <text x="30" y="80" font-family="Arial, sans-serif" font-size="13" fill="#94a3b8">AI Food Analysis</text>
  <rect x="200" y="66" width="460" height="18" rx="4" fill="#1e293b" />
  <rect x="200" y="66" width="437" height="18" rx="4" fill="url(#barGrad1)" />
  <text x="650" y="80" font-family="Arial, sans-serif" font-size="12" fill="#10B981">95%</text>

  <!-- Metabolic Engine -->
  <text x="30" y="116" font-family="Arial, sans-serif" font-size="13" fill="#94a3b8">Metabolic Engine</text>
  <rect x="200" y="102" width="460" height="18" rx="4" fill="#1e293b" />
  <rect x="200" y="102" width="414" height="18" rx="4" fill="url(#barGrad1)" />
  <text x="650" y="116" font-family="Arial, sans-serif" font-size="12" fill="#10B981">90%</text>

  <!-- Privacy / Local Storage -->
  <text x="30" y="152" font-family="Arial, sans-serif" font-size="13" fill="#94a3b8">Privacy (Local-Only)</text>
  <rect x="200" y="138" width="460" height="18" rx="4" fill="#1e293b" />
  <rect x="200" y="138" width="460" height="18" rx="4" fill="url(#barGrad1)" />
  <text x="650" y="152" font-family="Arial, sans-serif" font-size="12" fill="#10B981">100%</text>

  <!-- Analytics -->
  <text x="30" y="188" font-family="Arial, sans-serif" font-size="13" fill="#94a3b8">Analytics Dashboard</text>
  <rect x="200" y="174" width="460" height="18" rx="4" fill="#1e293b" />
  <rect x="200" y="174" width="368" height="18" rx="4" fill="url(#barGrad2)" />
  <text x="650" y="188" font-family="Arial, sans-serif" font-size="12" fill="#60a5fa">80%</text>

  <!-- PWA / Offline -->
  <text x="30" y="224" font-family="Arial, sans-serif" font-size="13" fill="#94a3b8">Offline / PWA</text>
  <rect x="200" y="210" width="460" height="18" rx="4" fill="#1e293b" />
  <rect x="200" y="210" width="391" height="18" rx="4" fill="url(#barGrad2)" />
  <text x="650" y="224" font-family="Arial, sans-serif" font-size="12" fill="#60a5fa">85%</text>

  <!-- Hydration -->
  <text x="30" y="260" font-family="Arial, sans-serif" font-size="13" fill="#94a3b8">Hydration Tracking</text>
  <rect x="200" y="246" width="460" height="18" rx="4" fill="#1e293b" />
  <rect x="200" y="246" width="345" height="18" rx="4" fill="url(#barGrad1)" />
  <text x="650" y="260" font-family="Arial, sans-serif" font-size="12" fill="#10B981">75%</text>

  <!-- CSV Export -->
  <text x="30" y="296" font-family="Arial, sans-serif" font-size="13" fill="#94a3b8">CSV Data Export</text>
  <rect x="200" y="282" width="460" height="18" rx="4" fill="#1e293b" />
  <rect x="200" y="282" width="322" height="18" rx="4" fill="url(#barGrad2)" />
  <text x="650" y="296" font-family="Arial, sans-serif" font-size="12" fill="#60a5fa">70%</text>

  <!-- Legend -->
  <rect x="250" y="340" width="14" height="14" rx="2" fill="url(#barGrad1)" />
  <text x="270" y="352" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8">Core / Privacy</text>
  <rect x="400" y="340" width="14" height="14" rx="2" fill="url(#barGrad2)" />
  <text x="420" y="352" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8">Platform / Export</text>
</svg>

</div>

<br>

---

## 🏗️ Architecture Diagram

<div align="center">

<svg width="760" height="460" viewBox="0 0 760 460" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="archBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
    <marker id="arrowA" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
      <path d="M0,0 L0,8 L8,4 Z" fill="#10B981" />
    </marker>
    <marker id="arrowB" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
      <path d="M0,0 L0,8 L8,4 Z" fill="#2563EB" />
    </marker>
  </defs>
  <rect width="760" height="460" rx="12" fill="url(#archBg)" />
  <text x="380" y="34" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">NutriVision — System Architecture</text>

  <!-- User Layer -->
  <rect x="290" y="56" width="180" height="44" rx="8" fill="#0B8F87" stroke="#10B981" stroke-width="1.5" />
  <text x="380" y="74" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#fff" text-anchor="middle">Browser / PWA</text>
  <text x="380" y="90" font-family="Arial, sans-serif" font-size="10" fill="#d1fae5" text-anchor="middle">React 18 + TypeScript + Vite</text>

  <!-- React Components Layer -->
  <rect x="30" y="150" width="140" height="40" rx="6" fill="#1e40af" stroke="#2563EB" stroke-width="1.5" />
  <text x="100" y="165" font-family="Arial, sans-serif" font-size="11" fill="#fff" text-anchor="middle">OnboardingForm</text>
  <text x="100" y="181" font-family="Arial, sans-serif" font-size="9" fill="#bfdbfe" text-anchor="middle">User Profile Setup</text>

  <rect x="200" y="150" width="140" height="40" rx="6" fill="#1e40af" stroke="#2563EB" stroke-width="1.5" />
  <text x="270" y="165" font-family="Arial, sans-serif" font-size="11" fill="#fff" text-anchor="middle">Dashboard</text>
  <text x="270" y="181" font-family="Arial, sans-serif" font-size="9" fill="#bfdbfe" text-anchor="middle">Daily Totals + Macros</text>

  <rect x="370" y="150" width="140" height="40" rx="6" fill="#1e40af" stroke="#2563EB" stroke-width="1.5" />
  <text x="440" y="165" font-family="Arial, sans-serif" font-size="11" fill="#fff" text-anchor="middle">CameraModule</text>
  <text x="440" y="181" font-family="Arial, sans-serif" font-size="9" fill="#bfdbfe" text-anchor="middle">Photo Capture</text>

  <rect x="540" y="150" width="140" height="40" rx="6" fill="#1e40af" stroke="#2563EB" stroke-width="1.5" />
  <text x="610" y="165" font-family="Arial, sans-serif" font-size="11" fill="#fff" text-anchor="middle">Analytics</text>
  <text x="610" y="181" font-family="Arial, sans-serif" font-size="9" fill="#bfdbfe" text-anchor="middle">14-Day Trends + CSV</text>

  <!-- Services Layer -->
  <rect x="80" y="260" width="160" height="44" rx="6" fill="#064e3b" stroke="#10B981" stroke-width="1.5" />
  <text x="160" y="278" font-family="Arial, sans-serif" font-size="11" fill="#fff" text-anchor="middle">metabolicService.ts</text>
  <text x="160" y="294" font-family="Arial, sans-serif" font-size="9" fill="#a7f3d0" text-anchor="middle">BMR / TDEE / Macros</text>

  <rect x="290" y="260" width="180" height="44" rx="6" fill="#064e3b" stroke="#10B981" stroke-width="1.5" />
  <text x="380" y="278" font-family="Arial, sans-serif" font-size="11" fill="#fff" text-anchor="middle">geminiService.ts</text>
  <text x="380" y="294" font-family="Arial, sans-serif" font-size="9" fill="#a7f3d0" text-anchor="middle">Gemini 1.5 Flash — Food AI</text>

  <rect x="520" y="260" width="160" height="44" rx="6" fill="#064e3b" stroke="#10B981" stroke-width="1.5" />
  <text x="600" y="278" font-family="Arial, sans-serif" font-size="11" fill="#fff" text-anchor="middle">analyticsService.ts</text>
  <text x="600" y="294" font-family="Arial, sans-serif" font-size="9" fill="#a7f3d0" text-anchor="middle">Trend Aggregation</text>

  <!-- Storage Layer -->
  <rect x="100" y="370" width="180" height="44" rx="6" fill="#312e81" stroke="#818cf8" stroke-width="1.5" />
  <text x="190" y="388" font-family="Arial, sans-serif" font-size="11" fill="#fff" text-anchor="middle">LocalStorage</text>
  <text x="190" y="404" font-family="Arial, sans-serif" font-size="9" fill="#c7d2fe" text-anchor="middle">UserProfile + MealLog metadata</text>

  <rect x="320" y="370" width="180" height="44" rx="6" fill="#312e81" stroke="#818cf8" stroke-width="1.5" />
  <text x="410" y="388" font-family="Arial, sans-serif" font-size="11" fill="#fff" text-anchor="middle">IndexedDB (db.ts)</text>
  <text x="410" y="404" font-family="Arial, sans-serif" font-size="9" fill="#c7d2fe" text-anchor="middle">Meal Images (Blobs)</text>

  <rect x="540" y="370" width="130" height="44" rx="6" fill="#312e81" stroke="#818cf8" stroke-width="1.5" />
  <text x="605" y="388" font-family="Arial, sans-serif" font-size="11" fill="#fff" text-anchor="middle">Google Gemini</text>
  <text x="605" y="404" font-family="Arial, sans-serif" font-size="9" fill="#c7d2fe" text-anchor="middle">External API (HTTPS)</text>

  <!-- Arrows: Browser to components -->
  <line x1="320" y1="100" x2="100" y2="150" stroke="#10B981" stroke-width="1.5" marker-end="url(#arrowA)" stroke-dasharray="4,3" />
  <line x1="360" y1="100" x2="270" y2="150" stroke="#10B981" stroke-width="1.5" marker-end="url(#arrowA)" stroke-dasharray="4,3" />
  <line x1="400" y1="100" x2="440" y2="150" stroke="#10B981" stroke-width="1.5" marker-end="url(#arrowA)" stroke-dasharray="4,3" />
  <line x1="430" y1="100" x2="610" y2="150" stroke="#10B981" stroke-width="1.5" marker-end="url(#arrowA)" stroke-dasharray="4,3" />

  <!-- Arrows: components to services -->
  <line x1="160" y1="190" x2="160" y2="260" stroke="#2563EB" stroke-width="1.5" marker-end="url(#arrowB)" />
  <line x1="440" y1="190" x2="380" y2="260" stroke="#2563EB" stroke-width="1.5" marker-end="url(#arrowB)" />
  <line x1="610" y1="190" x2="600" y2="260" stroke="#2563EB" stroke-width="1.5" marker-end="url(#arrowB)" />

  <!-- Arrows: services to storage -->
  <line x1="160" y1="304" x2="190" y2="370" stroke="#10B981" stroke-width="1.5" marker-end="url(#arrowA)" />
  <line x1="380" y1="304" x2="410" y2="370" stroke="#10B981" stroke-width="1.5" marker-end="url(#arrowA)" />
  <line x1="600" y1="304" x2="605" y2="370" stroke="#10B981" stroke-width="1.5" marker-end="url(#arrowA)" />
</svg>

</div>

<br>

---

## 🔄 Data Flow Diagram

<div align="center">

<svg width="760" height="340" viewBox="0 0 760 340" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dfBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
    <marker id="arrowDF" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
      <path d="M0,0 L0,8 L8,4 Z" fill="#10B981" />
    </marker>
  </defs>
  <rect width="760" height="340" rx="12" fill="url(#dfBg)" />
  <text x="380" y="30" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">NutriVision — Data Flow</text>

  <!-- Step boxes -->
  <!-- 1: User -->
  <rect x="20" y="120" width="100" height="50" rx="8" fill="#0B8F87" stroke="#10B981" stroke-width="2" />
  <text x="70" y="141" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">📱 User</text>
  <text x="70" y="158" font-family="Arial, sans-serif" font-size="9" fill="#d1fae5" text-anchor="middle">Takes Photo</text>

  <!-- Arrow 1 -->
  <line x1="120" y1="145" x2="155" y2="145" stroke="#10B981" stroke-width="2" marker-end="url(#arrowDF)" />
  <text x="137" y="136" font-family="Arial, sans-serif" font-size="8" fill="#94a3b8" text-anchor="middle">Base64</text>

  <!-- 2: CameraModule -->
  <rect x="155" y="120" width="110" height="50" rx="8" fill="#1e40af" stroke="#2563EB" stroke-width="2" />
  <text x="210" y="141" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">📷 Camera</text>
  <text x="210" y="158" font-family="Arial, sans-serif" font-size="9" fill="#bfdbfe" text-anchor="middle">CameraModule</text>

  <!-- Arrow 2 -->
  <line x1="265" y1="145" x2="300" y2="145" stroke="#10B981" stroke-width="2" marker-end="url(#arrowDF)" />
  <text x="282" y="136" font-family="Arial, sans-serif" font-size="8" fill="#94a3b8" text-anchor="middle">Stream</text>

  <!-- 3: Gemini AI -->
  <rect x="300" y="110" width="120" height="70" rx="8" fill="#064e3b" stroke="#10B981" stroke-width="2" />
  <text x="360" y="135" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">🤖 Gemini AI</text>
  <text x="360" y="151" font-family="Arial, sans-serif" font-size="9" fill="#a7f3d0" text-anchor="middle">1.5 Flash Model</text>
  <text x="360" y="167" font-family="Arial, sans-serif" font-size="8" fill="#6ee7b7" text-anchor="middle">JSON Schema Enforced</text>

  <!-- Arrow 3 -->
  <line x1="420" y1="145" x2="455" y2="145" stroke="#10B981" stroke-width="2" marker-end="url(#arrowDF)" />
  <text x="437" y="136" font-family="Arial, sans-serif" font-size="8" fill="#94a3b8" text-anchor="middle">Macros</text>

  <!-- 4: Validation -->
  <rect x="455" y="120" width="110" height="50" rx="8" fill="#1e40af" stroke="#2563EB" stroke-width="2" />
  <text x="510" y="141" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">✅ Validate</text>
  <text x="510" y="158" font-family="Arial, sans-serif" font-size="9" fill="#bfdbfe" text-anchor="middle">Sanitize + Parse</text>

  <!-- Arrow 4 down left -->
  <line x1="490" y1="170" x2="410" y2="230" stroke="#10B981" stroke-width="1.5" marker-end="url(#arrowDF)" stroke-dasharray="4,3" />
  <text x="430" y="200" font-family="Arial, sans-serif" font-size="8" fill="#94a3b8">Images</text>

  <!-- Arrow 4 down right -->
  <line x1="530" y1="170" x2="600" y2="230" stroke="#10B981" stroke-width="1.5" marker-end="url(#arrowDF)" stroke-dasharray="4,3" />
  <text x="578" y="200" font-family="Arial, sans-serif" font-size="8" fill="#94a3b8">Metadata</text>

  <!-- 5a: IndexedDB -->
  <rect x="330" y="230" width="120" height="50" rx="8" fill="#312e81" stroke="#818cf8" stroke-width="1.5" />
  <text x="390" y="251" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">IndexedDB</text>
  <text x="390" y="267" font-family="Arial, sans-serif" font-size="9" fill="#c7d2fe" text-anchor="middle">Blob Store</text>

  <!-- 5b: LocalStorage -->
  <rect x="560" y="230" width="120" height="50" rx="8" fill="#312e81" stroke="#818cf8" stroke-width="1.5" />
  <text x="620" y="251" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">LocalStorage</text>
  <text x="620" y="267" font-family="Arial, sans-serif" font-size="9" fill="#c7d2fe" text-anchor="middle">MealLog + Profile</text>

  <!-- Arrow from both to Dashboard -->
  <line x1="390" y1="280" x2="310" y2="310" stroke="#10B981" stroke-width="1.5" marker-end="url(#arrowDF)" />
  <line x1="620" y1="280" x2="340" y2="310" stroke="#10B981" stroke-width="1.5" marker-end="url(#arrowDF)" />

  <!-- 6: Dashboard -->
  <rect x="200" y="290" width="140" height="40" rx="8" fill="#0B8F87" stroke="#10B981" stroke-width="2" />
  <text x="270" y="308" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">📊 Dashboard</text>
  <text x="270" y="323" font-family="Arial, sans-serif" font-size="9" fill="#d1fae5" text-anchor="middle">Analytics + Insights</text>

  <!-- Side label: Private -->
  <rect x="660" y="60" width="84" height="26" rx="4" fill="#065f5a" stroke="#10B981" stroke-width="1" />
  <text x="702" y="77" font-family="Arial, sans-serif" font-size="10" fill="#10B981" text-anchor="middle">🔒 Local Only</text>
</svg>

</div>

<br>

---

## ⚙️ Installation

### Prerequisites

- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey) (free tier available)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/Kaelith69/NutriVision.git
cd NutriVision

# 2. Install dependencies
npm install

# 3. Set up your environment
echo "VITE_GEMINI_API_KEY=your_gemini_api_key_here" > .env

# 4. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy Options

| Platform | Command |
|---|---|
| **Surge.sh** | `./deploy_online.sh` |
| **Firebase** | `npm install -g firebase-tools && firebase deploy` |
| **Vercel** | Connect repo — `vercel.json` is already configured |
| **Netlify** | Connect repo — `netlify.toml` is already configured |
| **GitHub Pages** | Push to `main` — CI workflow handles the rest |

---

## 🔧 Usage

1. **First Launch** — Complete the onboarding form (age, sex, height, weight, activity level, target weight). The app computes your BMR, TDEE, and daily macro targets.
2. **Log a Meal** — Navigate to the Camera tab. Upload or snap a photo of your meal. Gemini analyzes it and returns macro data with an uncertainty range.
3. **Review the Log** — Tap any meal entry to see the detailed breakdown with your stored photo.
4. **Check Analytics** — The Analytics tab shows 14-day calorie and macro trends and fires alerts when you're consistently under- or over-target.
5. **Track Water** — Log water intake on the Dashboard. Your target adjusts dynamically to your body weight and activity level.
6. **Export Data** — Use the CSV export to download your full meal history.

---

## 📁 Project Structure

```
NutriVision/
├── src/
│   ├── components/
│   │   ├── Analytics.tsx       # 14-day trend charts, CSV export
│   │   ├── Auth.tsx            # Authentication guard
│   │   ├── CameraModule.tsx    # Photo capture + AI analysis trigger
│   │   ├── Dashboard.tsx       # Daily summary + water tracker
│   │   ├── Layout.tsx          # App shell, navigation
│   │   ├── MealDetailModal.tsx # Meal log detail view
│   │   ├── OnboardingForm.tsx  # User profile setup
│   │   ├── Settings.tsx        # Profile editing
│   │   └── ui/                 # Reusable UI primitives
│   ├── services/
│   │   ├── analyticsService.ts # Aggregation logic
│   │   ├── db.ts               # IndexedDB wrapper (image storage)
│   │   ├── firebase.ts         # Firebase config (optional auth)
│   │   ├── geminiService.ts    # Gemini AI API client
│   │   └── metabolicService.ts # BMR / TDEE / macro calculations
│   ├── utils/
│   │   └── dateUtils.ts        # Date helpers
│   ├── constants.ts            # App-wide constants
│   ├── types.ts                # TypeScript interfaces & enums
│   ├── App.tsx                 # Root component + routing
│   ├── index.css               # Global styles
│   └── index.tsx               # Entry point
├── public/                     # Static assets + PWA icons
├── .env                        # API keys (not committed)
├── vite.config.ts              # Vite + PWA plugin config
├── tailwind.config.js          # Tailwind theme
├── tsconfig.json               # TypeScript config
├── vercel.json                 # Vercel deploy config
├── netlify.toml                # Netlify deploy config
├── firebase.json               # Firebase deploy config
└── package.json
```

---

## 📈 Stats Visualization

<div align="center">

<svg width="700" height="280" viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="statsBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e293b;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="700" height="280" rx="12" fill="url(#statsBg)" />
  <text x="350" y="34" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">Project Stats</text>

  <!-- Stat cards -->
  <!-- Card 1: Components -->
  <rect x="30" y="60" width="140" height="90" rx="8" fill="#0B8F87" opacity="0.9" />
  <text x="100" y="90" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">9</text>
  <text x="100" y="112" font-family="Arial, sans-serif" font-size="11" fill="#d1fae5" text-anchor="middle">React</text>
  <text x="100" y="128" font-family="Arial, sans-serif" font-size="11" fill="#d1fae5" text-anchor="middle">Components</text>

  <!-- Card 2: Services -->
  <rect x="190" y="60" width="140" height="90" rx="8" fill="#2563EB" opacity="0.9" />
  <text x="260" y="90" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#ffffff" text-anchor="middle">5</text>
  <text x="260" y="112" font-family="Arial, sans-serif" font-size="11" fill="#bfdbfe" text-anchor="middle">Service</text>
  <text x="260" y="128" font-family="Arial, sans-serif" font-size="11" fill="#bfdbfe" text-anchor="middle">Modules</text>

  <!-- Card 3: 0 Backend -->
  <rect x="350" y="60" width="140" height="90" rx="8" fill="#064e3b" opacity="0.9" />
  <text x="420" y="90" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#10B981" text-anchor="middle">0</text>
  <text x="420" y="112" font-family="Arial, sans-serif" font-size="11" fill="#a7f3d0" text-anchor="middle">Backend</text>
  <text x="420" y="128" font-family="Arial, sans-serif" font-size="11" fill="#a7f3d0" text-anchor="middle">Servers</text>

  <!-- Card 4: 100% Local -->
  <rect x="510" y="60" width="160" height="90" rx="8" fill="#312e81" opacity="0.9" />
  <text x="590" y="90" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#a5b4fc" text-anchor="middle">100%</text>
  <text x="590" y="112" font-family="Arial, sans-serif" font-size="11" fill="#c7d2fe" text-anchor="middle">Local</text>
  <text x="590" y="128" font-family="Arial, sans-serif" font-size="11" fill="#c7d2fe" text-anchor="middle">Storage</text>

  <!-- Bottom row: Deploy targets -->
  <text x="350" y="185" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8" text-anchor="middle">Deploy Targets</text>
  <rect x="30" y="200" width="100" height="32" rx="6" fill="#1e293b" stroke="#10B981" stroke-width="1" />
  <text x="80" y="221" font-family="Arial, sans-serif" font-size="11" fill="#10B981" text-anchor="middle">Vercel</text>
  <rect x="150" y="200" width="100" height="32" rx="6" fill="#1e293b" stroke="#10B981" stroke-width="1" />
  <text x="200" y="221" font-family="Arial, sans-serif" font-size="11" fill="#10B981" text-anchor="middle">Netlify</text>
  <rect x="270" y="200" width="100" height="32" rx="6" fill="#1e293b" stroke="#10B981" stroke-width="1" />
  <text x="320" y="221" font-family="Arial, sans-serif" font-size="11" fill="#10B981" text-anchor="middle">Firebase</text>
  <rect x="390" y="200" width="100" height="32" rx="6" fill="#1e293b" stroke="#10B981" stroke-width="1" />
  <text x="440" y="221" font-family="Arial, sans-serif" font-size="11" fill="#10B981" text-anchor="middle">GitHub Pages</text>
  <rect x="510" y="200" width="100" height="32" rx="6" fill="#1e293b" stroke="#10B981" stroke-width="1" />
  <text x="560" y="221" font-family="Arial, sans-serif" font-size="11" fill="#10B981" text-anchor="middle">Surge.sh</text>

  <text x="350" y="260" font-family="Arial, sans-serif" font-size="10" fill="#475569" text-anchor="middle">Built with React 18 · TypeScript · Vite · Tailwind · Recharts · Gemini AI</text>
</svg>

</div>

<br>

---

## 🔒 Privacy

NutriVision is **100% local-first**. Here's exactly what goes where:

| Data | Storage | Leaves Device? |
|---|---|---|
| User profile (age, weight, etc.) | `LocalStorage` | ❌ Never |
| Meal logs + macro data | `LocalStorage` | ❌ Never |
| Meal photos | `IndexedDB` | ❌ Never |
| Food photo for AI analysis | HTTPS to Google Gemini | ✅ One-time, per-analysis |
| Water logs | `LocalStorage` | ❌ Never |

The **only** external network call is the image sent to Google's Gemini API for analysis. No analytics. No telemetry. No cookies. No Skynet.

---

## 🗺️ Roadmap

- [ ] Barcode scanner for packaged foods
- [ ] Voice-to-log meal entries
- [ ] Multi-day meal planning
- [ ] Custom macro presets
- [ ] Dark/light theme toggle
- [ ] Multiple user profiles

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). The short version: fork it, fix it, PR it.

---

## 📜 License

[MIT License](./LICENSE) — use it, break it, fix it. Just don't blame us if you get shredded.

---

<div align="center">

Made with 🥦 and questionable amounts of caffeine.

</div>
