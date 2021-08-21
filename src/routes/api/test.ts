import { withAuth } from '$lib/server/middleware/with-auth';

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
