import type { RequestHandler } from '@sveltejs/kit';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';

const extractTokenFromHeader = (authHeader: string) => authHeader.replace('Bearer ', '');

export const withAuth = <Input = unknown, Locals = Record<string, unknown>, Output extends DefaultBody = DefaultBody>(
	handler: RequestHandler<Locals, Input, Output>,
): RequestHandler<Locals, Input, Output> => {
	const handlerWithAuth: RequestHandler<Locals, Input, Output> = (req) => {
		const token = extractTokenFromHeader(req.headers.Authorization ?? '');
		// TODO: verify token
		handler(req);
	};
	return handlerWithAuth;
};
