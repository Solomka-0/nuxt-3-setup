import {BaseApiRequest} from "~/api/web";

type Request = {a: string}

type Response = {b: string}

export default class GetArticles extends BaseApiRequest{
    endpoint = ''

    // private apiRequest() {

    // }

    // get responseBody(): Response {
    //     if (this._responseBody === undefined) {
    //
    //         console.log('undefined')
    //     }
    //     return this._responseBody!
    // }
}