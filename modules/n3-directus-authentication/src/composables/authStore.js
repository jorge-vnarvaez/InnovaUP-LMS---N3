import {ref} from 'vue'

const access_token      = ref(null)
const refresh_token     = ref(null)
const expires           = ref(null)
const expires_time      = ref(null)
const mode              = 'json'

const sign_in_started   = ref(false)
const sign_in_finished  = ref(false)
const refresh_started   = ref(false)
const refresh_finished  = ref(false)
const sign_up_started   = ref(false)
const sign_up_finished  = ref(false)
const start_refresh     = () => { refresh_started.value = true }
const finish_refresh    = () => { refresh_finished.value = true }
const start_sign_in     = () => { sign_in_started.value = true }
const finish_sign_in    = () => { sign_in_finished.value = true }
const start_sign_up     = () => { sign_up_started.value = true }
const finish_sign_up    = () => { sign_up_finished.value = true }

const now_to_utc_0_time = (addExpiresMs = 0) => {

    const now = new Date()
    const now_utc_0 = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
    const now_utc_0_ms = now_utc_0.getTime()
    const now_utc_0_ms_expires = now_utc_0_ms + addExpiresMs

    return now_utc_0_ms_expires 

}

const interrupt_auth = () => { 
    sign_in_started.value = false
    sign_in_finished.value = false
    refresh_started.value = false
    refresh_finished.value = false
    sign_up_started.value = false
    sign_up_finished.value = false
}



const set_access_token  = (data) => { 
    const access_token_cookie = useCookie('access_token')
    access_token.value = data
    access_token_cookie.value = data
}
const set_refresh_token = (data) => { 
    const refresh_token_cookie = useCookie('refresh_token')
    refresh_token.value = data
    refresh_token_cookie.value = data
}
const set_expires       = (data) => { 
    const expires_cookie = useCookie('expires')
    const expires_time_cookie = useCookie('expires_time')

    expires.value = data
    expires_cookie.value = data

    expires_time.value = now_to_utc_0_time(data)
    expires_time_cookie.value = now_to_utc_0_time(data)

}

const set_response_data = (data) => {
    set_access_token(data.access_token)
    set_refresh_token(data.refresh_token)
    set_expires(data.expires)
    return data
}

const refresh_auth_tokens = async () => {

    // 
    const access_token_cookie = await useCookie('access_token')
    const refresh_token_cookie = await useCookie('refresh_token')
    const expires_cookie = await useCookie('expires')
    
    access_token.value = access_token_cookie.value
    refresh_token.value = refresh_token_cookie.value
    expires.value = expires_cookie.value


    // 
    if(!access_token.value || !refresh_token.value || !expires.value) {
        return false
    }

    const {refresh} = authApi()
    refresh({
        refresh_token: refresh_token_cookie.value,
        mode: mode,
    })


}

export function authStore(nuxt) {

    return {
        // State
        access_token,
        refresh_token,
        expires,
        expires_time,
        mode,
        // Mutations
        set_access_token,
        set_refresh_token,
        set_expires,
        set_response_data,
        refresh_auth_tokens,
        // Transitive states
        sign_in_started,
        sign_in_finished,
        refresh_started,
        refresh_finished,
        sign_up_started,
        sign_up_finished,
        // Transitive mutations
        start_refresh,
        finish_refresh,
        start_sign_in,
        finish_sign_in,
        start_sign_up,
        finish_sign_up,
        // General auth interrupt
        interrupt_auth,
    }
}
