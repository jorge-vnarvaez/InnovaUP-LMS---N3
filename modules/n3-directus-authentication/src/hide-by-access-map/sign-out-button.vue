<template>
    <q-btn v-if="is_user_logged_in" 
    outline color="black" 
    @click="onSubmit">Cerrar sesión</q-btn>
</template>
<script>
export default defineComponent({
    async setup() {

        // const { is_user_logged_in } = authData()
        const { is_user_logged_in } = userStore()
        const { signOut } = authApi()
        
        const onSubmit = async() => {
            signOut()
            await navigateTo('/')
        }

        return {
            onSubmit,
            is_user_logged_in,
            signOut
        }
    }
})
</script>
