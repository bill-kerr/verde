import { withAuth } from '$lib/server/middleware/with-auth';
import type { DefaultInput, DefaultOutput } from '$lib/server/types/default-handler';

export const get = withAuth<DefaultInput, DefaultOutput>(async () => ({
	status: 200,
	body: {
		message: 'This is the transactions GET endpoint',
	},
}));
