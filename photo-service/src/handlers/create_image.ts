import { IRequest } from 'itty-router';
import { ALL_IMAGES } from '../image_store';

const createImage = async (request: IRequest) => {
	const imageRequest = await request.json<{ id: string; url: string; author: string }>();
	const newImage = {
		id: parseInt(imageRequest.id),
		url: imageRequest.url,
		author: imageRequest.author,
	};

	ALL_IMAGES.unshift(newImage);

	return new Response(JSON.stringify(newImage), {
		status: 201,
		headers: { 'Content-Type': 'application/json' },
	});
};

export default createImage;
