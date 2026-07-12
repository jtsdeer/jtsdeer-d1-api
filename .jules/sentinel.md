## 2025-03-08 - Add security headers to HTML response
**Vulnerability:** Missing security headers on the main HTML response.
**Learning:** Cloudflare Workers returning raw HTML responses using `new Response(...)` must manually include standard security headers (CSP, X-Frame-Options, etc.).
**Prevention:** Ensure that any endpoint rendering HTML includes defense-in-depth headers by default.
## 2024-07-06 - Unsanitized Output in HTML Template rendering
**Vulnerability:** XSS vulnerability found in `src/renderHtml.ts`. The HTML template directly interpolates stringified JSON data (`${content}`) into a `<pre><code>` block without HTML entity escaping. An attacker could potentially store a malicious comment containing XSS payloads, which would then be executed when this HTML page is rendered.
**Learning:** Even when outputting data inside `<code>` blocks, it's essential to sanitize or escape it, as `<code>` blocks don't prevent HTML parsing, and if not escaped, the browser will interpret `<script>` tags and other HTML inside it.
**Prevention:** Always escape HTML entities (`<`, `>`, `&`, `"`, `'`) for any untrusted data or dynamically generated content before interpolating it into raw HTML strings.

## 2026-07-11 - Error Detail Leakage in Cloudflare Worker
**Vulnerability:** Information Disclosure vulnerability found in `src/index.ts`. The generic error handler in the `fetch` block was passing `e.message` or `String(e)` directly back in a 500 response.
**Learning:** In serverless environments like Cloudflare Workers interacting with databases (like D1), throwing detailed errors out to the client can inadvertently expose schema details, missing binding names, or infrastructure information to potential attackers.
**Prevention:** Fail securely by catching exceptions at the outermost boundary, logging the full detailed exception to the internal environment console (`console.error`), and only returning generic HTTP status codes/messages (e.g., 'Internal Server Error', 500) to the client.
## 2026-07-10 - [Info Leakage in Error Responses]
**Vulnerability:** The application was catching exceptions (including potential database connection or query errors) and returning the raw error message directly in the HTTP 500 response (`e.message`).
**Learning:** This can inadvertently expose internal architecture details, database schema information, or Cloudflare specific environment configurations to end users or attackers.
**Prevention:** Always log the full error details securely on the server-side using `console.error` and return a generic, safe error message (e.g., "An internal server error occurred.") to the client.
