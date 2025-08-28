import { IRequest } from 'itty-router';
import { Env } from '../env';

const createImage = async (request: IRequest, env: Env) => {
	const json = await request.json<{
		category_id: string;
		user_id: string;
		image_url: string;
		title: string;
		format: string;
		resolution: string;
		file_size_bytes: string;
	}>();
	let result;
	try {
		result = await env.DB.prepare(
			`
			INSERT INTO images (category_id, user_id, image_url, title, format, resolution, file_size_bytes)
			VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
			RETURNING *;
		`
		)
			.bind(json.category_id, json.user_id, json.image_url, json.title, json.format, json.resolution, json.file_size_bytes)
			.first();
	} catch (e) {
		let message;
		if (e instanceof Error) message = e.message;
		console.log({ message });

		if (!result) {
			return new Response('An error occurred', { status: 500 });
		}
	}

	return new Response(JSON.stringify(result), {
		status: 201,
		headers: { 'Content-Type': 'application/json' },
	});
};

export default createImage;
