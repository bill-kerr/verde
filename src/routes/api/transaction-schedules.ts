import { withAuth } from '$lib/server/middleware/withAuth';

export const post = withAuth<{ description: string }>(({ body }) => {
	return {
		body: {
			description: body.description,
		},
	};
});
