## 2024-07-08 - Missing Database Connection and Query Error Handling
**Learning:** In serverless architectures like Cloudflare Workers, external bindings like D1 databases (`env.DB`) might fail to initialize properly or encounter query failures (e.g. un-applied migrations). If not checked and handled with `try-catch`, this leads to generic internal errors instead of graceful fallbacks.
**Action:** Always verify that environment bindings exist before using them and wrap database queries in a `try-catch` block to handle query failures, returning appropriate HTTP status codes like 500.

## 2023-10-27 - Unmatched Implicit Routes Cause Redundant DB Executions
**Learning:** In Cloudflare Workers connected to D1 (or other databases), failing to implement early returns for unmatched routes like `/favicon.ico` allows the entire `fetch` handler to execute, triggering expensive, redundant database queries.
**Action:** Always parse the request URL and return early for known implicit browser requests or unrelated paths to prevent wasted DB executions and compute overhead.
