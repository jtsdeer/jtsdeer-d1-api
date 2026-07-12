## 2024-07-08 - Missing Database Connection and Query Error Handling
**Learning:** In serverless architectures like Cloudflare Workers, external bindings like D1 databases (`env.DB`) might fail to initialize properly or encounter query failures (e.g. un-applied migrations). If not checked and handled with `try-catch`, this leads to generic internal errors instead of graceful fallbacks.
**Action:** Always verify that environment bindings exist before using them and wrap database queries in a `try-catch` block to handle query failures, returning appropriate HTTP status codes like 500.

## 2024-07-09 - Invalid Durable Object Migrations Break Dev Server
**Learning:** If `wrangler.json` contains a Durable Objects `migrations` array specifying deleted or renamed classes (like `deleted_classes: ["WebSocketManager"]`) but the actual class or durable object binding does not exist, `wrangler dev` will fatally crash with: `Cannot apply deleted_classes migration to non-existent class`.
**Action:** When working with Cloudflare Workers configurations, periodically review the `migrations` block in `wrangler.json` and ensure any referenced classes or changes strictly align with the existing codebase and bindings to avoid breaking local development and deployments.
## 2024-07-09 - Early Return for Implicit Browser Requests
**Learning:** Implicit browser requests, like `/favicon.ico`, will trigger the entire `fetch` handler if not explicitly handled. In Cloudflare Workers connected to a D1 database, this can result in executing redundant and expensive database queries for requests that don't need them.
**Action:** Implement early returns for unmatched or implicit routes (e.g., `/favicon.ico`) to prevent unnecessary database operations.
