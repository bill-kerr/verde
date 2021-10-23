import { successResponse } from '$lib/server/utils/api-response';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = () => successResponse({ message: 'ok' });
