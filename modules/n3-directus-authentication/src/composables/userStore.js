import { ref, reactive } from 'vue'

const is_token_validated        = ref(false)
const is_refreshing_token       = ref(false)
const is_user_logged_in         = ref(false)
const user                      = reactive({data:null})
const user_roles                = reactive({data:null})

const set_is_token_validated    = (value)   => { is_token_validated.value = value }
const set_is_refreshing_token   = (value)   => { is_refreshing_token.value = value }
const set_is_user_logged_in     = (value)   => { is_user_logged_in.value = value }
const set_user                  = (data)    => { user.data = data }
const set_user_roles            = (data)    => { user_roles.data = data }

export function userStore() {
    return { 
        // State
        is_user_logged_in,
        is_token_validated,
        is_refreshing_token,
        user,
        user_roles,
        // Mutations
        set_is_token_validated,
        set_is_refreshing_token,
        set_is_user_logged_in,
        set_user,
        set_user_roles,
    }
}