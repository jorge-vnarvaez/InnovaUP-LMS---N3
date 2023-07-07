<template>
    <q-page padding class="font-sans">
        <div class="text-3xl text-bold text-slate-700">Mi perfil</div>
        <q-separator spaced="md" color="transparent"></q-separator>
        <user-profile-data />
    </q-page>
</template>
<script setup>
    const { user } = userStore()
</script>
