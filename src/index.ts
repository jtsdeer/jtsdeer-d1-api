import { renderHtml } from "./renderHtml";

export default {
  async fetch(request, env) {
    // 🛡️ Sentinel: Early return for implicit browser requests to prevent DB exhaustion
    const url = new URL(request.url);
    if (url.pathname === "/favicon.ico" || url.pathname === "/robots.txt") {
      return new Response(null, { status: 404 });
    }

    try {
      const url = new URL(request.url);
      if (url.pathname === "/favicon.ico") {
        return new Response(null, { status: 404 });
      }

      if (!env.DB) {
        throw new Error("Database binding 'DB' is not configured.");
      }

      const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
      const { results } = await stmt.all();

      return new Response(renderHtml(JSON.stringify(results, null, 2)), {
        headers: {
          "content-type": "text/html",
          // Security headers
          "Content-Security-Policy": "default-src 'self'; img-src 'self' https://imagedelivery.net; style-src 'self' https://static.integrations.cloudflare.com 'unsafe-inline'; frame-ancestors 'none';",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "Referrer-Policy": "strict-origin-when-cross-origin",
        },
      });
    } catch (e: unknown) {
      // 🛡️ Sentinel: Log the actual error internally to avoid leaking sensitive information
      console.error("Internal Server Error:", e);
      return new Response(
        "An internal server error occurred.",
        {
          status: 500,
          headers: {
             "content-type": "text/plain",
             "X-Content-Type-Options": "nosniff"
          }
        },
      );
    }
  },
} satisfies ExportedHandler<Env>;
