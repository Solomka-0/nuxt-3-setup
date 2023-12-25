import * as Web from "../web"
export const Request = Web
// export default class ApiError extends Error{
//     // constructor(code, message, api) {
//     //     super();
//     // }
// }
//
// // export const Web = Object.freeze(Object.keys(Api))
//
// export type Web = keyof typeof Web
// export let Endpoints: { [P in Web]: Object } = {"A": Api.A, "B": Api.B}

// : { [P in Web]: Object }

// console.log(Object.keys(Web))

//
// export class RequestA implements ApiCall<{a: string}, {}> {
//     endpoint =  'string'
//     request = { a: 'a' }
//     response = {}
// }

// type RequestA = {
//
// }

export class ApiRequest {
    constructor() {
        // let a: {[P in Web]: P}
        // console.log(a)
        // console.log(Object.keys(Api), new Api["A"]())
    }
}

// class A implements ApiError {
//
// }

//async getUser(session_id?: string | null): Promise<boolean> {
//
//       const authCookie = useCookie<string | null>("sid", {
//         path: "/",
//         maxAge: 60 * 60 * 24 * 7
//       })
//
//       session_id = session_id ?? authCookie.value
//
//       if (!session_id) {
//         return false
//       }
//
//       try {
//         const response = await $fetch<APIGetUserResponse>(APIUserEndpoints.GET_USER, {
//           method: "POST",
//           body: {
//             session_id: session_id
//           }
//         })
//
//         const { general, session } = response.response.data
//
//         this.user         = general
//         this.session      = session
//         authCookie.value  = this.session.id
//       } catch (e) {
//         this.logout()
//
//         return false
//       }
//
//       await this.checkAuthor()
//
//       return true
//     },