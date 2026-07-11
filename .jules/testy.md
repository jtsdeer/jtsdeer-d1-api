## 2024-07-08 - Missing Database Connection and Query Error Handling
**Learning:** In serverless architectures like Cloudflare Workers, external bindings like D1 databases (`env.DB`) might fail to initialize properly or encounter query failures (e.g. un-applied migrations). If not checked and handled with `try-catch`, this leads to generic internal errors instead of graceful fallbacks.
**Action:** Always verify that environment bindings exist before using them and wrap database queries in a `try-catch` block to handle query failures, returning appropriate HTTP status codes like 500.

## 2026-07-11 - CI Failure: Mismatched Package Names and Invalid Migrations
**Issue:** CI builds failed because the package names in `package.json` and `package-lock.json` did not match the deployment target `name` in `wrangler.json`. Additionally, an invalid Durable Object migration was present.
**Root Cause:** The `name` in `wrangler.json` was `jtsdeer-d1-api`, but the package files used `jtsdeer-d1-api-test`. The `migrations` block in `wrangler.json` referenced a non-existent `WebSocketManager` class.
**Fix:** Updated `name` to `jtsdeer-d1-api` in both package files to match `wrangler.json` exactly. Removed the invalid `migrations` block from `wrangler.json`.
**Validation:** Verified package metadata consistency and validated configuration structure locally.
**Impact:** Prevents CI failures during Workers Builds and avoids fatal crashes during local `wrangler dev` execution and deployment.
