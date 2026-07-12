## 2024-07-08 - Missing Database Connection and Query Error Handling
**Learning:** In serverless architectures like Cloudflare Workers, external bindings like D1 databases (`env.DB`) might fail to initialize properly or encounter query failures (e.g. un-applied migrations). If not checked and handled with `try-catch`, this leads to generic internal errors instead of graceful fallbacks.
**Action:** Always verify that environment bindings exist before using them and wrap database queries in a `try-catch` block to handle query failures, returning appropriate HTTP status codes like 500.

## 2024-07-12 - CI failures due to name mismatch and invalid migrations
**Issue:** GitHub Actions CI checks failed with opaque errors (no annotations or job logs).
**Root Cause:**
1. The `name` field in `package.json` (`jtsdeer-d1-api-test`) did not match the `name` field in `wrangler.json` (`jtsdeer-d1-api`), causing CI mismatch errors.
2. The `wrangler.json` file contained an invalid `migrations` block referencing a non-existent Durable Object `WebSocketManager`.
3. The `dev` script in `package.json` used `pnpm` while the project uses `npm`, causing package manager mixing issues.
**Fix:** Updated `package.json` and `package-lock.json` names to `jtsdeer-d1-api`, replaced `pnpm` with `npm run` in the `dev` script, and removed the invalid `migrations` block from `wrangler.json`.
**Validation:** Ran `npm install` and `npm run build` which succeeded successfully.
**Impact:** Unblocks CI checks and allows for successful deployments.
