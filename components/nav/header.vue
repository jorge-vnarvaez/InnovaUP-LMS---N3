<template>
    <div>
        <q-toolbar>
            <div class="py-2">
                <nuxt-link to="/">
                    <q-img src="/innovuplogo.png" position="left center" width="150px" style="max-width:170px; max-height:60px;"></q-img>
                </nuxt-link>
            </div>
            <q-space />
            <div v-if="$q.platform.is.desktop" class="flex gap-3">
                <!-- <auth-status-button /> -->
                <sign-up-button />
                <sign-in-button />
                <user-nav />
            </div>

            <div v-if="!$q.platform.is.desktop">
                <q-icon v-if="!mobileMenu" name="menu" size="20px" @click="mobileMenu = true"></q-icon>
                <q-icon v-if="mobileMenu" name="close" size="20px" @click="mobileMenu = false"></q-icon>
            </div>

        </q-toolbar>

        <div v-if="mobileMenu && !$q.platform.is.desktop" class="flex space-x-4 px-4 py-5">
            <sign-up-button @click="mobileMenu = false" />
            <sign-in-button @click="mobileMenu = false" />
            <user-nav />
        </div>
    </div>
</template>
<script setup>
// import { ref, computed, reactive, watch, inject, provide } from 'vue';
import { useRuntimeConfig } from '#app';
import { useQuasar } from 'quasar'

const $q = useQuasar()


const mobileMenu = ref(false)



</script>
