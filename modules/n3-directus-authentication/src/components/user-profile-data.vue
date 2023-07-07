<template>
        <q-card bordered flat class="p-5">
            <div v-if="user.data">
                
                <div class="font-sans flex flex-col md:flex-row gap-5">
                    <div>
                        <div class="font-bold text-xl">Nombre</div>
                        <div class="flex gap-2 text-lg">
                            <span>{{ user.data.first_name }}</span>
                            <span>{{ user.data.last_name }}</span>
                        </div>
                    </div>
                    <div>
                        <div class="font-bold text-xl">Correo</div>
                        <div class="flex gap-2 text-lg">
                            <span>{{ user.data.email }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </q-card>
</template>
<script setup>
    const { user } = userStore()
</script>
