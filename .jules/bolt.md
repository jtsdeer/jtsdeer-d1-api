
## 2024-07-12 - Prevent redundant queries on implicit routes
**Learning:** In Cloudflare Workers with catch-all routes connected to D1, implicit browser requests (like `/favicon.ico`) trigger full fetch execution, causing expensive, redundant database queries.
**Action:** Always implement early returns for unmatched explicit and implicit routes at the very beginning of the `fetch` handler to avoid unnecessary workload and DB reads.
