import type { DefaultInput, DefaultLocals, DefaultOutput } from '$lib/server/types/default-handler';
import type { RequestHandler } from '@sveltejs/kit';
import type { DefaultBody } from '@sveltejs/kit/types/endpoint';

export type AuthedRequestHandler<
	Input = DefaultInput,
	Output extends DefaultBody = DefaultBody,
	Locals = DefaultLocals & { userId: string }
> = RequestHandler<Locals & { userId: string }, Input, DefaultOutput<Output>>;
