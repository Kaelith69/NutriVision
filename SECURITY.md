# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 1.x (current) | ✅ Active |

---

## Reporting a Vulnerability

If you've found a security vulnerability in NutriVision, please **do not open a public GitHub issue**. Public disclosure before a fix is available puts other users at risk.

### How to Report

1. **Email**: Open a private security advisory via GitHub:  
   → [https://github.com/Kaelith69/NutriVision/security/advisories/new](https://github.com/Kaelith69/NutriVision/security/advisories/new)

2. **Include the following in your report**:
   - A clear description of the vulnerability
   - Steps to reproduce (proof of concept if applicable)
   - The potential impact or attack scenario
   - Any suggested mitigations you may have

3. **What happens next**:
   - You'll receive an acknowledgement within **72 hours**
   - We'll investigate and keep you updated on progress
   - Once a fix is released, we'll credit you in the changelog (unless you prefer to remain anonymous)

---

## Security Architecture Notes

NutriVision is a **local-first, zero-backend application**. Understanding the architecture helps scope the attack surface:

### Data Storage
- **LocalStorage**: User profile and meal log metadata are stored in the browser's LocalStorage. This data never leaves the device.
- **IndexedDB**: Meal images are stored locally as blobs via IndexedDB. This data never leaves the device.
- **No database server**: There is no backend database. There is nothing to breach server-side because there is no server.

### External Network Calls
- The **only** external call this app makes is sending a meal photo to the **Google Gemini API** over HTTPS for food analysis.
- No user profile data, no meal history, no PII is sent to any external service.
- The Gemini API key is stored as a `VITE_` environment variable and **must never be committed to source control**.

### API Key Security
- The Gemini API key is embedded in the client-side bundle at build time (standard practice for Vite PWAs with a BFF-less architecture).
- For production deployments, restrict your Gemini API key to your deployment domain in [Google AI Studio](https://aistudio.google.com/).
- Never commit `.env` files. The `.gitignore` already excludes them.

### Content Security
- There is no user authentication system in the current release.
- There is no server-side input validation because there is no server.
- The Gemini response is parsed and validated before being written to storage.

---

## Out of Scope

The following are **not** considered security vulnerabilities for this project:

- Issues requiring physical access to a device (if someone has your unlocked device, they can see your meal log — this is expected)
- Self-XSS (you injecting malicious data into your own browser storage)
- Rate limits on the Gemini API (this is Google's responsibility, not ours)
- Social engineering attacks on the user (we cannot fix you)

---

## Disclosure Policy

We follow a **coordinated disclosure** model. We ask that you give us reasonable time to investigate and patch before any public disclosure. We aim to resolve critical issues within **14 days** of a confirmed report.

---

*Security is not an afterthought here — it's the entire point of the local-first architecture. We take reports seriously.*
