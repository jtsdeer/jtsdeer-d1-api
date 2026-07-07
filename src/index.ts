import { renderHtml } from "./renderHtml";

export default {
  async fetch(request, env) {
    if (request.method !== "GET") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: {
          Allow: "GET",
        },
      });
    }

    try {
      const stmt = env.DB.prepare("SELECT * FROM comments LIMIT 3");
      const { results } = await stmt.all();

      return new Response(renderHtml(JSON.stringify(results, null, 2)), {
        headers: {
          "content-type": "text/html",
        },
      });
    } catch (error) {
      console.error(error); // Add console.error so logs show what went wrong
      return new Response("Internal Server Error", { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;
