import { renderHtml } from "./renderHtml";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/favicon.ico") {
      return new Response(null, { status: 404 });
    }

    try {
      // ⚡ Bolt: Early return for unmatched routes to prevent redundant D1 database queries
      // for implicit browser requests like /favicon.ico or /robots.txt
      const url = new URL(request.url);
      if (url.pathname !== "/") {
        return new Response("Not found", { status: 404 });
      }

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
    } catch (e: unknown) {
      return new Response(
        `Error: ${e instanceof Error ? e.message : String(e)}`,
        { status: 500 },
      );
    }
  },
} satisfies ExportedHandler<Env>;
