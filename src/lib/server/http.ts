export enum ResponseErrorStatus {
	Unauthorized = 402,
	Forbidden = 403,
	AppError = 422,
}

const error = (error: string, status?: ResponseErrorStatus, info?: any) => {
	// const strDate = new Date().toISOString();
	const statusError = status || ResponseErrorStatus.AppError;

	log(error, statusError, JSON.stringify(info) || '');

	return new Response(JSON.stringify({ error }), { status: statusError });
};

const log = (error: string, status?: ResponseErrorStatus, info?: any) => {
	const strDate = new Date().toISOString();
	const statusMessage = status ? ` - status: ${status}` : '';
	const InfoMessage = info ? ` - info: ${info}` : '';

	console.log(`${strDate} - error: ${error}${statusMessage}${InfoMessage}`);
};
// const urlSearchPramsToJSON = (searchParams: URLSearchParams) => {
// 	const queryParams: any = {};

// 	for (const [key, value] of searchParams.entries()) {
// 		queryParams[key] = value;
// 	}

// 	return queryParams;
// };

// export const http = { error, logMessage, urlSearchPramsToJSON };
export const http = { error, log };
