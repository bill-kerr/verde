import type { RequestHandler } from '@sveltejs/kit';
import type { Headers } from '@sveltejs/kit/types/helper';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';
import firebaseAdmin from '$lib/server/clients/firebase/client';
import type { DefaultOutput, DefaultInput, DefaultLocals } from '$lib/server/types/default-handler';

const extractTokenFromHeader = (headers: Headers) => {
	const authHeader = headers.authorization;
	return authHeader ? authHeader.replace('Bearer ', '') : '';
};

export const withAuth = <
	Input = DefaultInput,
	Output extends DefaultBody = DefaultBody,
	Locals = DefaultLocals & { userId: string }
>(
	handler: RequestHandler<Locals, Input, Output>,
): RequestHandler<Locals & { userId: string }, Input, DefaultOutput<Output>> => {
	const rejectUnauthorizedHandler: RequestHandler<Locals, Input, DefaultOutput<Output>> = () => ({
		status: 403,
		body: {
			error: 'You are not authorized to access this route.',
		},
	});

	const handlerWithAuth: RequestHandler<Locals & { userId: string }, Input, DefaultOutput<Output>> = async (req) => {
		const token = extractTokenFromHeader(req.headers);
		try {
			const result = await firebaseAdmin.auth().verifyIdToken(token);
			req.locals.userId = result.uid;
			return handler(req);
		} catch (error) {
			console.error(error);
			return rejectUnauthorizedHandler(req);
		}
	};

	return handlerWithAuth;
};
