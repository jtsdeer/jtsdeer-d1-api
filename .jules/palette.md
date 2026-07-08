## 2024-07-08 - Adding rel="noopener noreferrer" to external links
**Learning:** In Cloudflare Worker apps that render HTML directly, ensuring `target="_blank"` links have `rel="noopener noreferrer"` is an important detail for both web security and performance, which was initially missing in the basic HTML template response.
**Action:** Always check dynamically generated HTML templates for basic web security and accessibility best practices (like `alt` tags and `noopener`) when touching frontend-facing responses.
