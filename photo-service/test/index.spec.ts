import { SELF } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
// const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

// it('responds with Hello World! (unit style)', async () => {
// 	const request = new IncomingRequest('http://example.com');
// 	// Create an empty context to pass to `worker.fetch()`.
// 	const ctx = createExecutionContext();
// 	const response = await worker.fetch(request, env, ctx);
// 	// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
// 	await waitOnExecutionContext(ctx);
// 	expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
// });

// it('responds with Hello World! (integration style)', async () => {
// 	const response = await SELF.fetch('https://example.com');
// 	expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
// });

describe('Photo Service', () => {
	it('returns a 404 if a non-existent endpoint is called', async () => {
		const response = await SELF.fetch('https://example.com/invalid-endpoint');
		expect(response.status).toBe(404);
	});

	it('returns a 200 OK response', async () => {
		const response = await SELF.fetch('https://example.com/images');
		expect(response.status).toBe(200);
	});

	it('should return images in the response', async () => {
		const response = await SELF.fetch('http://www.example.com/images');
		const json = await response.json();

		expect(json).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(Number),
					url: expect.any(String),
					author: expect.any(String),
				}),
			])
		);
	});

	it('should return a set number of images if count is provided', async () => {
		const response = await SELF.fetch('http://www.example.com/images?count=2');
		const json = await response.json();

		expect(json).toHaveLength(2);
	});
});

describe('POST /images', () => {
	it('should return a 201 response code', async () => {
		const payload = {
			id: 4,
			url: 'http://www.example.com/images/4',
			author: 'John Doe',
		};

		const response = await SELF.fetch('http://www.example.com/images', {
			method: 'POST',
			body: JSON.stringify(payload),
		});

		expect(response.status).toBe(201);
	});

	it('should return the created image in the response', async () => {
		const payload = {
			id: 4,
			url: 'http://www.example.com/images/4',
			author: 'John Doe',
		};

		const response = await SELF.fetch('http://www.example.com/images', {
			method: 'POST',
			body: JSON.stringify(payload),
		});

		const json = await response.json();

		expect(json).toEqual(payload);
	});
});
