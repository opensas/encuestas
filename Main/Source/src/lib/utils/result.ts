type Ok<Data> = { ok: true; data: Data; error: null };
type Err<Error> = { ok: false; data: null; error: Error };

export type Result<Data, Error> = Ok<Data> | Err<Error>;

export function ok<Data>(data: Data): Ok<Data> {
	return { ok: true, data, error: null };
}

export function err<Error>(error: Error): Err<Error> {
	return { ok: false, data: null, error };
}
