import { eq } from "drizzle-orm";
import { json } from "itty-router-extras";
import { user } from "./schema";
import { drizzle } from "drizzle-orm/d1";
import { z } from "zod";
import * as schema from "./schema";
import { D1Database } from "@cloudflare/workers-types";

export interface Env {
  DB: D1Database;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    const db = drizzle(env.DB, { schema });

    if (path.startsWith("/api/user")) {
      if (path === "/api/user") {
        if (method === "GET") {
          const params = url.searchParams;

          if (params.has("id")) {
            const id = params.get("id") as string;
            const res = await db.query.user.findFirst({
              where: (user, { eq }) => eq(user.id, id),
              with: {
                virtualbox: true
                
              },
            });
            return json(res ?? {});
          } else {
            const res = await db.select().from(user).all();
            console.log("res", res);
            return new Response(JSON.stringify(res));
          }
        } else if (method === "POST") {
          const userSchema = z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
          });
          const body = await request.json();
          const { id, name, email } = userSchema.parse(body);
          const res = await db.insert(user).values({ id, name, email }).returning().get();
          return json({ res });
        } else {
          return new Response("Method Not Found", { status: 405 });
        }
      } else if (path === "/api/user/virtualbox") {
        const params = url.searchParams;
        if (method === "GET" && params.has("id")) {
          const id = params.get("id") as string;
          const res = await db.query.user.findFirst({
            where: (user, { eq }) => eq(user.id, id),
            with: {
              virtualbox: true,
            },
          });
          console.log("res", res);
          return json(res ?? {});
        } else {
          return new Response("Method Not Allowed", { status: 405 });
        }
      } else {
        return new Response("Not Found", { status: 404 });
      }
    } else {
      return new Response("Not Found", { status: 404 });
    }
  },
} satisfies ExportedHandler<Env>;
