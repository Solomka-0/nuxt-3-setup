import type {ApiRequest} from "~/api/interfaces/ApiError";

export enum ApiMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export class BaseApiRequest {
    endpoint = ''
    private method: ApiMethods = ApiMethods.POST
    private _requestBody?: Request
    private _responseBody?: Response

    constructor(requestBody: Request) {
        this._requestBody = requestBody
    }
    get responseBody(): Response {
        if (this._responseBody === undefined) {
            console.log('undefined')
        }
        return this._responseBody!
    }
}
