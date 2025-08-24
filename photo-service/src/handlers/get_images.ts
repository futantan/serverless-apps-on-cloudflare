import { IRequest } from 'itty-router';
import { ALL_IMAGES } from '../image_store';

const getImages = (request: IRequest) => {
	let images = ALL_IMAGES;

	if (request.query.count) {
		images = images.slice(0, Number(request.query.count));
	}

	return new Response(JSON.stringify(images), {
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export default getImages;
