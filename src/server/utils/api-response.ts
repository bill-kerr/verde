export function apiErrorResponse(error: string, status = 500) {
	return {
		status,
		body: {
			error,
		},
	};
}

export function apiSuccessResponse<T>(body: T, status = 200) {
	return {
		status,
		body,
	};
}
