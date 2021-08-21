import { withAuth } from '$lib/server/middleware/with-auth';
import type { DefaultOutput } from '$lib/server/types/default-handler';

export const post = withAuth<{ publicToken: string }, DefaultOutput>(async (req) => {
	console.log('this is the financial institutions POST endpoint');
	console.log('publicToken', req.body.publicToken);
	return {
		status: 200,
		body: {
			message: 'This is the financial institutions POST endpoint',
		},
	};
});
