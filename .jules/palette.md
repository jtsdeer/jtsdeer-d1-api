## 2026-07-11 - Added missing alt attribute to decorative/informative image
**Learning:** Even simple generated template HTML (like the successful connection screen) often misses fundamental a11y attributes like `alt` text on key branding/informational images.
**Action:** Always inspect `<img/>` tags in rendered views for descriptive or empty (decorative) `alt` attributes.

## 2026-07-12 - Added keyboard focus to scrollable code blocks
**Learning:** Code blocks (`<pre>`) containing potentially horizontally overflowing content often lack keyboard focusability, making them inaccessible for keyboard-only users attempting to scroll horizontally to read the full query or result.
**Action:** Ensure `<pre>` tags that might overflow include `tabindex="0"`, `role="region"`, and an `aria-label` to allow focus and scrolling.
