## 2026-07-09 - Missing Routing Causes Redundant Database Queries
**Learning:** Cloudflare Workers that lack basic routing will execute the entire `fetch` handler for implicit browser requests like `/favicon.ico` or `/robots.txt`. In a worker connected to D1, this leads to expensive and unnecessary database queries on every page load.
**Action:** Always implement an early return for unmatched paths (or specifically ignore common asset paths) before executing expensive operations like D1 queries.
