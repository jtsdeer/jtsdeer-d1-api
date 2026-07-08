import { renderHtml } from "./renderHtml";

export default {
  async fetch(request, env) {
    try {
      const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
      const { results } = await stmt.all();

      return new Response(renderHtml(JSON.stringify(results, null, 2)), {
        headers: {
          "content-type": "text/html",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "Content-Security-Policy": "default-src 'self'; img-src 'self' https://imagedelivery.net; style-src 'self' https://static.integrations.cloudflare.com 'unsafe-inline'; script-src 'self'",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
      });
    } catch (error) {
      // Return a generic error message to prevent leaking stack traces or internal DB info
      return new Response("Internal Server Error", {
        status: 500,
        headers: {
          "content-type": "text/plain",
          "X-Content-Type-Options": "nosniff"
        }
      });
    }
  },
} satisfies ExportedHandler<Env>;
