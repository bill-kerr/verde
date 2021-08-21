import type { DefaultBody } from '@sveltejs/kit/types/endpoint';

export type DefaultInput = Record<string, unknown>;
export type DefaultLocals = Record<string, unknown>;
export type DefaultOutput<T = DefaultBody> = T | { error: string };
