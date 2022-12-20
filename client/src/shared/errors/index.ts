export type ErrorData = Record<string, unknown>;

export class ServerError extends Error {
    constructor(
        public message: string,
        public code: string,
        public status: number,
        public data: ErrorData,
    ) {
        super();
    }
}
