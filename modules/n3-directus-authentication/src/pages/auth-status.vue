<template>
    <q-page padding>
        <div class="text-bold text-3xl">Auth system status</div>

        <q-separator spaced="lg"></q-separator>

        <div>
            <div>
                    <show-by-roles />
                    <show-by-access />
                    <show-by-author />
                    <q-separator></q-separator>
                    <hide-by-roles :roles="['Administrator']" />
                    <hide-by-access />
                    <hide-by-author />
            </div>
            <div>
                <div>is_user_logged_in: {{ is_user_logged_in }}</div>
                <div>access_token: {{ access_token }}</div>
                <div>refresh_token: {{ refresh_token }}</div>
                <div>expires: {{ expires }}</div>
            </div>
            <div v-if="true">
                {{ user }}
            </div>

        </div>
        <q-separator spaced="lg"></q-separator>

        <div class="flex gap-3">

            <sign-up-button/>
            <sign-in-button/>


            <q-space></q-space>

            <user-nav/>
            <sign-out-button/>

        </div>

        <div class="my-4">
            <access-denied-block />
        </div>
    
        <div class="flex flex-col md:flex-row font-sans gap-10">
            <div class="col" v-if="directusAuth">
                <div class="text-xl text-bold py-3">{{directusAuth.sign_up_labels.title}}</div>
                <sign-up-form/>
                <div class="py-3" v-html="directusAuth.sign_up_labels.message"></div>
            </div>
            <div class="col" v-if="directusAuth">
                <div class="text-xl text-bold py-3">{{directusAuth.sign_in_labels.title}}</div>
                <sign-in-form/>
                <div class="py-3" v-html="directusAuth.sign_in_labels.message"></div>
            </div>
        </div>
    </q-page>
</template>
<script setup>
    import { ref, onMounted } from 'vue';
    import { useRuntimeConfig } from '#app';
    

    const directusAuth = ref(null)
    onMounted(async () => {
        const runtimeConfig = useRuntimeConfig()
        directusAuth.value = runtimeConfig.public.directusAuth
    })

    const {
        access_token,
        refresh_token,
        expires,
    } = authStore()

    const { 
        is_user_logged_in,
        user,
    } = userStore()

    // console.log(access_token)
</script>