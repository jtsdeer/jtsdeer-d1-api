## 2026-07-11 - Added missing alt attribute to decorative/informative image
**Learning:** Even simple generated template HTML (like the successful connection screen) often misses fundamental a11y attributes like `alt` text on key branding/informational images.
**Action:** Always inspect `<img/>` tags in rendered views for descriptive or empty (decorative) `alt` attributes.
## 2024-07-14 - Accessible Scrollable Code Blocks
**Learning:** Code blocks (`<pre>`) that contain potentially horizontally overflowing content are inaccessible to keyboard-only users because they cannot be focused and scrolled unless they contain inherently focusable elements. This prevents users relying on keyboard navigation from reading truncated code snippets or query results.
**Action:** Always include `tabindex="0"`, `role="region"`, and an informative `aria-label` (e.g., "Database query results") on `<pre>` elements that may scroll. This ensures the region is focusable, scrollable via arrow keys, and clearly identified to screen readers.
