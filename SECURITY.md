# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 1.x (latest) | ✅ Yes |
| < 1.0 | ❌ No |

---

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability in NutriVision, please report it responsibly. Here's how:

### 1. Use GitHub's Private Vulnerability Reporting

Go to **Security → Report a vulnerability** on the [NutriVision repository](https://github.com/Kaelith69/NutriVision/security/advisories/new).

This creates a private advisory that only the maintainers can see. Describe:

- The nature of the vulnerability (e.g., data exposure, XSS, API key leakage)
- Steps to reproduce
- Potential impact
- Any suggested mitigations you already know

### 2. What to Expect

- **Acknowledgement**: Within 72 hours of receiving your report
- **Assessment**: We'll evaluate severity and scope within 7 days
- **Fix timeline**: Depends on severity:
  - **Critical** (data exfiltration, credential exposure): patch within 7 days
  - **High**: patch within 14 days
  - **Medium / Low**: addressed in the next scheduled release
- **Credit**: We'll thank you publicly in the release notes (with your permission)

---

## Security Architecture

Understanding how NutriVision handles data helps contextualise what constitutes a real vulnerability.

### What lives on your device only
- User profile (age, sex, height, weight, targets)
- Meal logs and macro data
- Water intake logs
- Meal photos (stored as IndexedDB Blobs)
- Gemini API key (stored in LocalStorage — see note below)

### What leaves your device
- **Meal images** — sent to Google Gemini API during food analysis. Only raw image pixels are transmitted. No user profile data, no meal history, no identifying information is attached to the request.

### API Key Storage Note
The Gemini API key is stored in `localStorage`. This is standard for client-side API key management in PWAs. Be aware:
- Anyone with physical access to your browser can extract it via DevTools
- This is by design for a zero-server architecture; there is no backend to proxy the request
- Use a key with appropriate quota limits in [Google AI Studio](https://aistudio.google.com/) to limit blast radius if a key is ever compromised

### What We Don't Have
- No backend server
- No user accounts (by default)
- No telemetry, analytics SDKs, or tracking pixels
- No CDN-loaded third-party scripts that could be compromised

---

## Known Non-Issues (by Design)

The following are intentional design decisions, not vulnerabilities:

| Behaviour | Reason |
|---|---|
| API key visible in LocalStorage | Zero-server architecture; no backend to proxy through |
| Meal photos stored unencrypted in IndexedDB | IndexedDB is sandboxed per-origin; encryption would require a user-managed password |
| No CSRF protection | No server-side state to protect |

---

## Dependency Security

We use standard npm dependencies. To check for known vulnerabilities:

```bash
npm audit
```

We aim to keep dependencies up to date. If you spot an outdated dependency with a known CVE, please open a regular issue (not a private report, unless it's exploitable in context).

---

*Security is a process, not a feature. Thank you for helping keep NutriVision safe.*
