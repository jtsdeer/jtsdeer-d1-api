## 2026-07-11 - Added missing alt attribute to decorative/informative image

**Learning:** Even simple generated template HTML (like the successful connection screen) often misses fundamental a11y attributes like `alt` text on key branding/informational images.
**Action:** Always inspect `<img/>` tags in rendered views for descriptive or empty (decorative) `alt` attributes.

## 2026-07-15 - Added keyboard scroll support to overflowing code blocks

**Learning:** Code blocks (`<pre>`) that contain potentially overflowing content must include `tabindex="0"`, `role="region"`, and an `aria-label` to ensure they are keyboard focusable and scrollable for accessibility.
**Action:** Always check `<pre>` tags and similar potentially scrollable elements for keyboard accessibility.
