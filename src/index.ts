import { renderHtml } from "./renderHtml";

export default {
  async fetch(request, env) {
    const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
    const { results } = await stmt.all();

    return new Response(renderHtml(JSON.stringify(results, null, 2)), {
      headers: {
        "content-type": "text/html",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Content-Security-Policy": "default-src 'self'; img-src https://imagedelivery.net; style-src 'unsafe-inline' https://static.integrations.cloudflare.com",
      },
    });
  },
} satisfies ExportedHandler<Env>;
