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

export interface Env {
	API_AUTH_KEY: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const api_key = request.headers.get('x-api-auth-key');

		if (api_key === env.API_AUTH_KEY) {
			return new Response('Authenticated!', { status: 200 });
		}

		return new Response('Unauthorized', { status: 401 });
	},
} satisfies ExportedHandler<Env>;
