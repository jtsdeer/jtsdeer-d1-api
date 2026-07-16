## 2025-03-08 - Fix CI build for multiple environments
**Issue:** The GitHub CI check suite failed for both `jtsdeer-d1-api` and `jtsdeer-d1-api-test` because the `wrangler.json` `name` configuration was likely modified directly or incorrectly managed, causing the worker names expected by CI to mismatch or fail.
**Root Cause:** When a Cloudflare Workers project has multiple CI build checks expecting different worker names (e.g., production vs. test targets), modifying only the top-level 'name' in 'wrangler.json' breaks the pipeline for the other environment.
**Fix:** Define environment overrides (`env.test.name`) within `wrangler.json` to satisfy all CI target expectations simultaneously, and duplicate the required resource bindings (like `d1_databases`) within the override block to prevent missing binding errors.
**Validation:** Validated by ensuring both targets build locally and match expected names.
**Impact:** Prevents CI build failures and allows multi-environment deployments to proceed successfully.
