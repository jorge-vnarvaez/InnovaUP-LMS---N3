<template>
    <q-layout>
        <q-page-container>
            <NavHeader />
            <slot />
            <NavFooter />
        </q-page-container>
    </q-layout>
</template>
<script setup>
    // const { refresh_auth_tokens } = authStore()
    // refresh_auth_tokens()
</script>



