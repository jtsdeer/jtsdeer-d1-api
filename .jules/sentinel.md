## 2026-07-10 - [Info Leakage in Error Responses]
**Vulnerability:** The application was catching exceptions (including potential database connection or query errors) and returning the raw error message directly in the HTTP 500 response (`e.message`).
**Learning:** This can inadvertently expose internal architecture details, database schema information, or Cloudflare specific environment configurations to end users or attackers.
**Prevention:** Always log the full error details securely on the server-side using `console.error` and return a generic, safe error message (e.g., "An internal server error occurred.") to the client.
