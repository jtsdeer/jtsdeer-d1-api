import { renderHtml } from "./renderHtml";

export default {
  async fetch(request, env) {
    try {
      if (!env.DB) {
        throw new Error("Database binding 'DB' is not configured.");
      }

      const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
      const { results } = await stmt.all();

      return new Response(renderHtml(JSON.stringify(results, null, 2)), {
        headers: {
          "content-type": "text/html",
        },
      });
    } catch (e: any) {
      return new Response(`Error: ${e.message}`, { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
