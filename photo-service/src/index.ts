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
import { Router } from 'itty-router';
import { Env } from './env';
import createImage from './handlers/create_image';
import getImages from './handlers/get_images';
import getSingleImage from './handlers/get_single_image';

const router = Router();
router
	.get('/images', getImages)
	.get('/images/:id', getSingleImage)
	.post('/images', createImage)
	.get('/test', () => new Response('Test endpoint', { status: 200 }))
	.get('*', () => new Response('Not found', { status: 404 }));

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return router.fetch(request, env);
	},
} satisfies ExportedHandler<Env>;
