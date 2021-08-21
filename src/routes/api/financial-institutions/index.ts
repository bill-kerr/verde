import { withAuth } from '$lib/server/middleware/with-auth';
import type { DefaultInput, DefaultOutput } from '$lib/server/types/default-handler';

export const post = withAuth<DefaultInput, DefaultOutput>(async () => {
	console.log('this is the financial institutions POST endpoint');
	return {
		status: 200,
		body: {
			message: 'This is the financial institutions POST endpoint',
		},
	};
});
