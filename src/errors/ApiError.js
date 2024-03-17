export class ApiError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }

    // static badRequest(message) {
    //     return new ApiError(400, message);
    // }
    //
    // static notFound(message) {
    //     return new ApiError(404, message);
    // }
    //
    // static alreadyExists(message) {
    //     return new ApiError(409, message);
    // }
}