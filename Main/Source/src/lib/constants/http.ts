/// Request was successful
export const OK = 200;
/// Resource was created
export const CREATED = 201;

/// Invalid request
export const BAD_REQUEST = 400;
/// Not logged in, unauthenticated
export const UNAUTHORIZED = 401;
/// Access denied
export const FORBIDDEN = 403;
/// Resource not found
export const NOT_FOUND = 404;

/// Server error
export const INTERNAL_ERROR = 500;

export const HTTP_STATUSES = [
	OK,
	CREATED,
	BAD_REQUEST,
	UNAUTHORIZED,
	FORBIDDEN,
	NOT_FOUND,
	INTERNAL_ERROR,
];

export type HTTP_STATUS = (typeof HTTP_STATUSES)[number];
