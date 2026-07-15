## 2026-07-09 - Missing Routing Causes Redundant Database Queries
**Learning:** Cloudflare Workers that lack basic routing will execute the entire `fetch` handler for implicit browser requests like `/favicon.ico` or `/robots.txt`. In a worker connected to D1, this leads to expensive and unnecessary database queries on every page load.
**Action:** Always implement an early return for unmatched paths (or specifically ignore common asset paths) before executing expensive operations like D1 queries.
## 2024-05-24 - [Avoid implicit browser requests triggering expensive D1 queries]
**Learning:** Cloudflare Workers connected to D1 will execute the full `fetch` handler for implicit browser requests like `/favicon.ico` if not explicitly caught. This results in unnecessary, expensive database queries running for unneeded static asset requests.
**Action:** Implement early returns checking `url.pathname` for unmatched routes (e.g., `/favicon.ico`) at the beginning of the `fetch` handler to skip database and rendering logic.
## 2024-07-13 - [Extract Static Headers to Module Scope in Cloudflare Workers]
**Learning:** Extracting static object literals like HTTP headers outside the main `fetch` handler to the module scope prevents unnecessary memory reallocation on every request, reducing garbage collection overhead and slightly improving throughput in the V8 runtime.
**Action:** Always extract static response structures, such as configurations or headers, to the module scope in Cloudflare Workers applications.
## 2024-05-24 - [Avoid URL object allocation on hot path for route matching]
**Learning:** In Cloudflare Workers (V8 runtime), constructing a full `URL` object (e.g., `new URL(request.url)`) is surprisingly computationally expensive compared to simple string matching because it involves full parsing and object allocation.
**Action:** When performing simple routing or path checking (like verifying if a request is to the root `/`), use string methods like `indexOf` and substring checking directly on `request.url` to bypass URL object instantiation. This can yield a significant (~10x) speedup on that specific check.
