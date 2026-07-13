## 2026-07-11 - Added missing alt attribute to decorative/informative image
**Learning:** Even simple generated template HTML (like the successful connection screen) often misses fundamental a11y attributes like `alt` text on key branding/informational images.
**Action:** Always inspect `<img/>` tags in rendered views for descriptive or empty (decorative) `alt` attributes.
## 2025-03-09 - Accessible Code Blocks
**Learning:** Code blocks (`<pre>`) that may contain horizontally overflowing content must have `tabindex="0"`, `role="region"`, and an `aria-label` to be keyboard accessible. Without this, users navigating via keyboard cannot scroll the content to view it, hiding potentially critical information.
**Action:** When rendering query results, JSON, or any content in a `<pre>` block that could overflow, ensure keyboard accessibility properties are present.
