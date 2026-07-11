## 2024-07-06 - Unsanitized Output in HTML Template rendering
**Vulnerability:** XSS vulnerability found in `src/renderHtml.ts`. The HTML template directly interpolates stringified JSON data (`${content}`) into a `<pre><code>` block without HTML entity escaping. An attacker could potentially store a malicious comment containing XSS payloads, which would then be executed when this HTML page is rendered.
**Learning:** Even when outputting data inside `<code>` blocks, it's essential to sanitize or escape it, as `<code>` blocks don't prevent HTML parsing, and if not escaped, the browser will interpret `<script>` tags and other HTML inside it.
**Prevention:** Always escape HTML entities (`<`, `>`, `&`, `"`, `'`) for any untrusted data or dynamically generated content before interpolating it into raw HTML strings.

## 2026-07-11 - Error Detail Leakage in Cloudflare Worker
**Vulnerability:** Information Disclosure vulnerability found in `src/index.ts`. The generic error handler in the `fetch` block was passing `e.message` or `String(e)` directly back in a 500 response.
**Learning:** In serverless environments like Cloudflare Workers interacting with databases (like D1), throwing detailed errors out to the client can inadvertently expose schema details, missing binding names, or infrastructure information to potential attackers.
**Prevention:** Fail securely by catching exceptions at the outermost boundary, logging the full detailed exception to the internal environment console (`console.error`), and only returning generic HTTP status codes/messages (e.g., 'Internal Server Error', 500) to the client.
