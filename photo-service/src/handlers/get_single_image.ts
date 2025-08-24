import { IRequest } from 'itty-router';
import { ALL_IMAGES } from '../image_store';

const getSingleImage = (request: IRequest) => {
	let image = ALL_IMAGES.find((i) => i.id === Number(request.params.id));

	if (!image) {
		return new Response('Image not found', { status: 404 });
	}

	return new Response(JSON.stringify(image), {
		headers: { 'Content-Type': 'application/json' },
	});
};

export default getSingleImage;
