import type { RequestHandler } from '@sveltejs/kit';
import type { Headers } from '@sveltejs/kit/types/helper';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';
import { verifyToken } from '$lib/server/clients/firebase/client';
import type { DefaultOutput, DefaultInput, DefaultLocals } from '$lib/server/types/default-handler';
import { errorResponse } from '$lib/server/utils/api-response';

const extractTokenFromHeader = (headers: Headers) => {
	const authHeader = headers.authorization;
	return authHeader ? authHeader.replace('Bearer ', '') : '';
};

export const withAuth = <
	Input = DefaultInput,
	Output extends DefaultBody = DefaultBody,
	Locals = DefaultLocals & { userId: string }
>(
	handler: RequestHandler<Locals & { userId: string }, Input, DefaultOutput<Output>>,
): RequestHandler<Locals & { userId: string }, Input, DefaultOutput<Output>> => {
	const rejectUnauthorizedHandler: RequestHandler<Locals, Input, DefaultOutput<Output>> = () =>
		errorResponse('You are not authorized to access this endpoint', 403);

	const handlerWithAuth: RequestHandler<Locals & { userId: string }, Input, DefaultOutput<Output>> = async (req) => {
		const token = extractTokenFromHeader(req.headers);
		try {
			const userId = await verifyToken(token);
			req.locals.userId = userId;
			return handler(req);
		} catch (error) {
			console.error(error);
			return rejectUnauthorizedHandler(req);
		}
	};

	return handlerWithAuth;
};
