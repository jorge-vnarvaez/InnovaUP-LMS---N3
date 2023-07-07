<template>
    <q-avatar color="deep-orange-2" class="cursor-pointer" v-if="is_user_logged_in">
        <span class="text-sm">
            <span v-if="user?.data?.first_name">
                {{ user.data.first_name[0] }}
            </span>
            <span v-if="user?.data?.last_name">
                {{ user.data.last_name[0] }}
            </span>
        </span>

        <q-menu :offset="[0,15]">
            <q-list style="min-width: 150px" class="font-sans">

                <q-item>
                    <q-item-section class="text-bold">
                        <span class="text-sm flex gap-1 flex-wrap">
                            <span v-if="user?.data?.first_name">
                                {{ user.data.first_name }}
                            </span>
                            <span v-if="user?.data?.last_name">
                                {{ user.data.last_name }}
                            </span>
                        </span>
                    </q-item-section>
                </q-item>
                <q-separator />

                <q-item clickable v-close-popup to="/my-profile">
                    <q-item-section class="text-bold">Mi Perfil</q-item-section>
                </q-item>
                    
                
                <q-item clickable v-close-popup @click="onSubmit">
                    <q-item-section class="text-bold">Cerrar sesión</q-item-section>
                </q-item>
                
            </q-list>
        </q-menu>
    </q-avatar> 
</template>
<script>
export default defineComponent({
    async setup() {
        const { is_user_logged_in, user } = userStore()
        const { signOut } = authApi()

        const {expires, refresh_token, access_token} = authStore()
        
        const onSubmit = async() => {
            signOut()
            await navigateTo('/')
        }

        return {
            // logOut,
            onSubmit,
            expires,
            refresh_token,
            access_token,
            signOut,
            user,

            // Store
            is_user_logged_in,
        }
    }
})
</script>
