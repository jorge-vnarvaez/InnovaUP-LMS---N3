import { useRuntimeConfig } from '#app'

/**
 * Get the public API URL from the runtime config
 * @returns {Promise<string>} DIRECTUS_AUTHENTICATION_URL
 */
const getApiUrl = async () => {
    const { DIRECTUS_AUTHENTICATION_URL } = await useRuntimeConfig().public.directusAuth;
    return DIRECTUS_AUTHENTICATION_URL;
}

const getApiMessages = async () => {
    const { messages } = await useRuntimeConfig().public.directusAuth;
    return messages;
}

/**
 * Login to the Directus API
 * @param {string} credentials.email "admin@example.com"
 * @param {string} credentials.password "example"
 * @returns 
 */
const login = async (credentials = {
    email: null,
    password: null,
}, preUrl = null) => {
    
    const { set_response_data } = authStore()
    const { set_is_user_logged_in } = userStore()
    const { get_me } = authApi()


    const DIRECTUS_AUTHENTICATION_URL = await getApiUrl();

    
    if(preUrl){
        const preUrlResponse = await fetch(`${ DIRECTUS_AUTHENTICATION_URL }${preUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
    }

    


    const response = await fetch(`${ DIRECTUS_AUTHENTICATION_URL }/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    const response_data = await response.json();

    try {
        set_response_data(response_data.data)
        set_is_user_logged_in(true)
        get_me(response_data.data)
    } catch (error) {
        set_response_data({
            access_token: null,
            refresh_token: null,
            expires: null,
        })
        set_is_user_logged_in(false)
        // TODO: enviar notificación de error
        const { sign_in } = await getApiMessages()
        return sign_in['401']
    }

    return response_data
}

const requestPassword = async (credentials = {
    email: null,
    resetPasswordTo: null,
}) => {

    credentials.reset_url = credentials.reset_url || window.location.origin + (credentials.resetPasswordTo ?  credentials.resetPasswordTo : '/reset-password')

    // console.log('requestPassword', credentials)
    const DIRECTUS_AUTHENTICATION_URL = await getApiUrl();

    // console.log(credentials)

    // return true
    
    const response = await fetch(`${ DIRECTUS_AUTHENTICATION_URL }/auth/password/request
    `, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    // console.log('requestPassword', response)

    // // const response_data = await response.json();

    try {
        return response
    } catch (error) {
        return response
    }
}


const resetPassword = async (credentials = {
    password: null,
    token: null,
}) => {

    

    // console.log('requestPassword', credentials)
    const DIRECTUS_AUTHENTICATION_URL = await getApiUrl();

    // console.log(credentials)

    // return true
    
    const response = await fetch(`${ DIRECTUS_AUTHENTICATION_URL }/auth/password/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    // console.log('requestPassword', response)

    // // const response_data = await response.json();

    try {
        return response
    } catch (error) {
        return response
    }
}

const refresh = async (credentials = {
    refresh_token: null,
    mode: 'json',
}) => {
    const { set_response_data } = authStore()
    const { set_is_user_logged_in } = userStore()
    const { get_me } = authApi()

    const DIRECTUS_AUTHENTICATION_URL = await getApiUrl();
    const response = await fetch(`${ DIRECTUS_AUTHENTICATION_URL }/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    const response_data = await response.json();
    try {

        // TODO: modularizar
        window.dataLayer.push({
            'event': 'GARDNIevent',
            'eventCategory': 'login - ingreso',
            'eventAction': 'info',
            'eventLabel': 'carga',
            'mercado': 'dgt',
        });

        set_response_data(response_data.data)
        set_is_user_logged_in(true)
        get_me(response_data.data)
    } catch (error) {
        set_response_data({
            access_token: null,
            refresh_token: null,
            expires: null,
        })
        set_is_user_logged_in(false)
    }

    return response_data
}

/**
 * Kill the current session
 * It can't be undone and the user will have to login again
 * It closes any open sessions on other devices
 * @param {*} credentials.refresh_token refresh_token from the Directus API
 * @returns 
 */
const logout = async (credentials = {
    refresh_token: null,
}) => {
    const { set_response_data } = authStore()
    const { set_is_user_logged_in, set_user } = userStore()

    const DIRECTUS_AUTHENTICATION_URL = await getApiUrl();
    const response = await fetch(`${ DIRECTUS_AUTHENTICATION_URL }/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    const response_data = await response.json();
    set_response_data({
        access_token: null,
        refresh_token: null,
        expires: null,
    })
    set_is_user_logged_in(false)
    set_user(null)
    return response_data
}


const register = async (credentials = {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
}) => {

    const { login } = authApi()
    
    const DIRECTUS_AUTHENTICATION_URL = await getApiUrl();
    const response = await fetch(`${ DIRECTUS_AUTHENTICATION_URL }/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    try {
        login(credentials)
        const { sign_up } = await getApiMessages()
        return sign_up['204']
    } catch (error) {
        // TODO: Enviar notificación de error
        console.log('error de registro')
        console.log(error)
    }

    return response
}  


const get_me = async (credentials = {
    access_token: null,
}) => {
    
    const { set_user } = userStore()

    const DIRECTUS_AUTHENTICATION_URL = await getApiUrl();
    const response = await fetch(`${ DIRECTUS_AUTHENTICATION_URL }/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.access_token,
        }
    });

    const response_data = await response.json();

    try {
        set_user(response_data.data)
    } catch (error) {
        set_user(null)
    }

    return response_data
}

export function authApi() {
    return {
        //  
        login,
        signIn: login,
        // 
        refresh,
        refresh_token: refresh,
        // 
        logout,
        signOut: logout,
        // 
        register,
        signUp: register,
        // 
        get_me,
        get_user: get_me,
        get_userData: get_me,
        //
        getApiUrl,
        // 
        requestPassword,
        resetPassword,
    }
}