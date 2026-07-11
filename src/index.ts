import { renderHtml } from "./renderHtml";

export default {
  async fetch(request, env) {
    // 🛡️ Sentinel: Early return for implicit browser requests to prevent DB exhaustion
    const url = new URL(request.url);
    if (url.pathname === "/favicon.ico" || url.pathname === "/robots.txt") {
      return new Response(null, { status: 404 });
    }

    try {
      if (!env.DB) {
        throw new Error("Database binding 'DB' is not configured.");
      }

      const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
      const { results } = await stmt.all();

      return new Response(renderHtml(JSON.stringify(results, null, 2)), {
        headers: {
          "content-type": "text/html",
          // 🛡️ Sentinel: Add fundamental security headers
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
      });
    } catch (e: unknown) {
      // 🛡️ Sentinel: Log actual error internally, but do not leak details to the client
      console.error("Operation failed", e);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
