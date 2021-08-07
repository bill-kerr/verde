import { withAuth } from '$lib/server/middleware/withAuth';

export const post = withAuth<any, { description: string }>(({ body }) => {
	return {
		body: {
			description: body.description,
		},
	};
});

export const get = () => {
	return {
		body: {
			message: 'ok',
		},
	};
};
