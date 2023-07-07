<template>
    <q-toolbar>
        <div class="py-2">
            <nuxt-link to="/">
                <!-- <q-img src="/compitelogo.png" position="left center" width="150px" style="max-width:170px; max-height:60px;"></q-img> -->
            </nuxt-link>
        </div>
        <q-space />
        <div class="flex gap-3">
            <!-- <auth-status-button /> -->
            <!-- <sign-up-button /> -->
            <sign-in-button />
            <user-nav />
        </div>
    </q-toolbar>
</template>
<script>
import { ref, computed, reactive, watch, inject, provide } from 'vue';
import { useRuntimeConfig } from '#app';
export default defineComponent({
    async setup() {
        // const { $sanitizationRules } = await useNuxtApp()
        return {
            is_user_logged_in: false,
        }
    }
})
</script>
