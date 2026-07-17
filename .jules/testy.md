## 2024-07-08 - Missing Database Connection and Query Error Handling
**Learning:** In serverless architectures like Cloudflare Workers, external bindings like D1 databases (`env.DB`) might fail to initialize properly or encounter query failures (e.g. un-applied migrations). If not checked and handled with `try-catch`, this leads to generic internal errors instead of graceful fallbacks.
**Action:** Always verify that environment bindings exist before using them and wrap database queries in a `try-catch` block to handle query failures, returning appropriate HTTP status codes like 500.

## 2025-02-28 - Invalid Durable Object migrations cause fatal crashes
**Learning:** In Cloudflare Workers configuration (`wrangler.json`), if the `migrations` block references non-existent Durable Object classes (e.g. `deleted_classes` referencing `WebSocketManager` which does not exist), it will cause fatal crashes during local development (`wrangler dev`) and likely deployment.
**Action:** Validate that `migrations` configurations exactly match existing Durable Objects and verify local development environment starts successfully with `wrangler dev` when altering `wrangler.json`.
## 2023-10-27 - Unmatched Implicit Routes Cause Redundant DB Executions
**Learning:** In Cloudflare Workers connected to D1 (or other databases), failing to implement early returns for unmatched routes like `/favicon.ico` allows the entire `fetch` handler to execute, triggering expensive, redundant database queries.
**Action:** Always parse the request URL and return early for known implicit browser requests or unrelated paths to prevent wasted DB executions and compute overhead.
## 2024-07-12 - CI failures due to name mismatch and invalid migrations
**Issue:** GitHub Actions CI checks failed with opaque errors (no annotations or job logs).
**Root Cause:**
1. The `name` field in `package.json` (`jtsdeer-d1-api-test`) did not match the `name` field in `wrangler.json` (`jtsdeer-d1-api`), causing CI mismatch errors.
2. The `wrangler.json` file contained an invalid `migrations` block referencing a non-existent Durable Object `WebSocketManager`.
3. The `dev` script in `package.json` used `pnpm` while the project uses `npm`, causing package manager mixing issues.
**Fix:** Updated `package.json` and `package-lock.json` names to `jtsdeer-d1-api`, replaced `pnpm` with `npm run` in the `dev` script, and removed the invalid `migrations` block from `wrangler.json`.
**Validation:** Ran `npm install` and `npm run build` which succeeded successfully.
**Impact:** Unblocks CI checks and allows for successful deployments.
## 2024-07-09 - Invalid Durable Object Migrations Break Dev Server
**Learning:** If `wrangler.json` contains a Durable Objects `migrations` array specifying deleted or renamed classes (like `deleted_classes: ["WebSocketManager"]`) but the actual class or durable object binding does not exist, `wrangler dev` will fatally crash with: `Cannot apply deleted_classes migration to non-existent class`.
**Action:** When working with Cloudflare Workers configurations, periodically review the `migrations` block in `wrangler.json` and ensure any referenced classes or changes strictly align with the existing codebase and bindings to avoid breaking local development and deployments.
## 2024-07-09 - Early Return for Implicit Browser Requests
**Learning:** Implicit browser requests, like `/favicon.ico`, will trigger the entire `fetch` handler if not explicitly handled. In Cloudflare Workers connected to a D1 database, this can result in executing redundant and expensive database queries for requests that don't need them.
**Action:** Implement early returns for unmatched or implicit routes (e.g., `/favicon.ico`) to prevent unnecessary database operations.
## 2024-05-24 - [Remove accidental package-lock.json to fix CI build caching]
**Learning:** In projects managed by `pnpm`, an accidental `package-lock.json` committed to the repository can cause CI runner caching conflicts and build failures because tools may prioritize npm's lockfile over pnpm's lockfile.
**Action:** When working on CI pipeline fixes, always check for the presence of multiple lockfiles (e.g., `package-lock.json` and `pnpm-lock.yaml`) and remove the incorrect one.

## 2025-10-09 - Strict TypeScript Error Type Verification
**Learning:** The project enforces strict TypeScript rules, which do not allow the use of `any` in catch blocks (e.g., `catch (e: any)`). This causes CI build failures.
**Action:** Always use `catch (e: unknown)` and verify the error type using `e instanceof Error` before accessing its properties (like `e.message` or `e.stack`) to avoid CI build failures and properly log errors.

## 2024-05-18 - CI Deployments fail for multiple worker environments
**Issue:** The project has multiple CI targets (e.g., `jtsdeer-d1-api` and `jtsdeer-d1-api-test`), but modifying only the top-level `name` in `wrangler.json` breaks the pipeline for the other environment because of name mismatch.
**Root Cause:** The Cloudflare worker deploy targets rely on exact `name` matching. CI pipelines expect different names based on whether they are building production or test.
**Fix:** Set the top-level `name` to the production target and added an `env.test` environment override to satisfy the test pipeline target. Duplicated the `d1_databases` binding in the override block.
**Validation:** Validated locally using `wrangler deploy --env test --dry-run` and verified both CI jobs target their respective endpoints correctly.
**Impact:** Both the main CI and the test CI can now correctly deploy from the same branch without modifying configuration on the fly.
