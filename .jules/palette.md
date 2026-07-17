## 2026-07-11 - Added missing alt attribute to decorative/informative image
**Learning:** Even simple generated template HTML (like the successful connection screen) often misses fundamental a11y attributes like `alt` text on key branding/informational images.
**Action:** Always inspect `<img/>` tags in rendered views for descriptive or empty (decorative) `alt` attributes.

## 2026-07-12 - Added keyboard scrolling to overflowing code blocks
**Learning:** `<pre>` and `<code>` blocks that contain potentially wide/overflowing content (like database outputs) are inaccessible to keyboard-only users who cannot scroll them horizontally. They also lack context for screen reader users.
**Action:** Ensure that code blocks (`<pre>`) that may scroll include `tabindex="0"`, `role="region"`, and an `aria-label` to enable keyboard scrolling and provide semantic meaning.
