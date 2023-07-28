<template>
    <q-btn v-if="!is_user_logged_in" 
    outline color="teal-14" 
    to="/sign-up">Registro</q-btn>
</template>
<script>
export default defineComponent({
    async setup() {

        // const { is_user_logged_in } = authData()
        const { is_token_validated,is_user_logged_in } = userStore()


        return {
            is_user_logged_in,
            is_token_validated
        }
    }
})
</script>
