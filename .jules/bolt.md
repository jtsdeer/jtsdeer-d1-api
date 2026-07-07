## 2024-12-27 - Fast HTML Escaping in Cloudflare Workers (V8)
**Learning:** In Cloudflare Workers (V8), chained `.replace()` calls for HTML entity escaping are actually quite fast compared to custom replaceAll map logic or switch statements. However, the biggest performance win comes from avoiding the chained replacements entirely for strings that do not contain any HTML entities.
**Action:** Use an early `RegExp.test()` for safe strings before falling back to chained `.replace()` calls for strings requiring escaping.
