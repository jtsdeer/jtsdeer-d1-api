## 2024-07-08 - Missing Database Connection and Query Error Handling
**Learning:** In serverless architectures like Cloudflare Workers, external bindings like D1 databases (`env.DB`) might fail to initialize properly or encounter query failures (e.g. un-applied migrations). If not checked and handled with `try-catch`, this leads to generic internal errors instead of graceful fallbacks.
**Action:** Always verify that environment bindings exist before using them and wrap database queries in a `try-catch` block to handle query failures, returning appropriate HTTP status codes like 500.

## 2025-02-28 - Invalid Durable Object migrations cause fatal crashes
**Learning:** In Cloudflare Workers configuration (`wrangler.json`), if the `migrations` block references non-existent Durable Object classes (e.g. `deleted_classes` referencing `WebSocketManager` which does not exist), it will cause fatal crashes during local development (`wrangler dev`) and likely deployment.
**Action:** Validate that `migrations` configurations exactly match existing Durable Objects and verify local development environment starts successfully with `wrangler dev` when altering `wrangler.json`.
