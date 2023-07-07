// import { apiConfig } from '~/composables/apiConfig'
// export function authApi(nuxt) {

//     const { DIRECTUS_AUTHENTICATION_URL } = nuxt.options.runtimeConfig.public.directusAuth;

//     const login = async (credentials = {}) => {
        
//         /**
//          * Example credentials:
//          * "email": "admin@example.com",
//          * "password": "example"
//          */
//         const response = await fetch(`${ DIRECTUS_AUTHENTICATION_URL }/auth/login`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(credentials)
//         })
//         return await response.json()
//     }

//     return {
//         login,
//     }

// }

// export async function auth_signUp(credentials = {}) {
//     const { apiBaseURL } = apiConfig()
//     const response = await fetch(`${apiBaseURL}/auth/login`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         // "email": "admin@example.com",
//         // "password": "d1r3ctu5"
//         body: JSON.stringify(credentials)
//     })
//     return await response.json()
// }


// export async function auth_refresh(credentials = {}) {
//     const { apiBaseURL } = apiConfig()
//     const response = await fetch(`${apiBaseURL}/auth/refresh`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         // "refresh_token": "gmPd...8wuB",
//         // "mode": "json"
//         body: JSON.stringify(credentials)
//     })
//     return await response.json()
// }

// export async function auth_logout(credentials = {}) {
//     const { apiBaseURL } = apiConfig()
//     const response = await fetch(`${apiBaseURL}/auth/logout`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         // "refresh_token": "gmPd...8wuB"
//         body: JSON.stringify(credentials)
//     })
//     return await response.json()
// }

// export async function auth_password_request(credentials = {}) {
//     const { apiBaseURL } = apiConfig()
//     const response = await fetch(`${apiBaseURL}/auth/password/request`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         // "email": "admin@example.com"
//         body: JSON.stringify(credentials)
//     })
//     return await response.json()
// }

// export async function auth_password_reset(credentials = {}) {
//     const { apiBaseURL } = apiConfig()
//     const response = await fetch(`${apiBaseURL}/auth/password/reset`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         // "token": "eyJh...KmUk",
//         // "password": "d1r3ctu5"
//         body: JSON.stringify(credentials)
//     })
//     return await response.json()
// }

