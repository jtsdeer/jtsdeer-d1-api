## 2025-03-08 - Add security headers to HTML response
**Vulnerability:** Missing security headers on the main HTML response.
**Learning:** Cloudflare Workers returning raw HTML responses using `new Response(...)` must manually include standard security headers (CSP, X-Frame-Options, etc.).
**Prevention:** Ensure that any endpoint rendering HTML includes defense-in-depth headers by default.
