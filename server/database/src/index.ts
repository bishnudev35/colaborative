import { eq } from "drizzle-orm";

import { json } from "itty-router-extras";
import { user } from "./schema";
import { drizzle } from "drizzle-orm/d1";

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
export interface Env{
	DB:D1Database ;
}


export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url=new URL(request.url)
		const path=url.pathname
		const method=request.method

		const db=drizzle(env.DB);
		console.log("db",env.DB)
		if(path==="/api/user" && method==="GET"){
			const params=url.searchParams

			if(params.has("id")){
				const id=params.get("id") as string
				const res=await db.select().from(user).where(eq(user.id,id)).get();
				return json(res ?? {});
			}else{
				const res=await db.select().from(user).all();
				console.log("res",res)
				return new Response(JSON.stringify(res));
			}
		}else{
			return new Response("Not Found",{status:404});
		}
	},
} satisfies ExportedHandler<Env>;
