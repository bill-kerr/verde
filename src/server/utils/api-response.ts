export function errorResponse(error: string, status = 500) {
	return {
		status,
		body: {
			error,
		},
	};
}

export function successResponse<T>(body: T, status = 200) {
	return {
		status,
		body,
	};
}
