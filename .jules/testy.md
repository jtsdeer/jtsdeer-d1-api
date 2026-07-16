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

## 2025-10-09 - CI mismatch error fixes should be isolated
**Learning:** If an explicit instruction to fix a CI failure occurs while operating under a specific persona, the CI fix (e.g. updating the deployment target `name` in `wrangler.json`) must be isolated on its own branch so that it is properly reviewed, and not bundled with unrelated feature logic in a single PR. Combining them is treated as an unauthorized architectural change and will fail review.
**Action:** When identifying CI-related configuration problems (like target name mismatches) that need fixing, strictly separate those fixes onto a dedicated branch (like `testy-ci-fix`) rather than grouping them with functional/UI fixes in the same branch.
