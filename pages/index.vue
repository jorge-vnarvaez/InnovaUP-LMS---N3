<template lang="">
    <div class="bg-slate-100">
        <!-- <q-page padding>
            <div class="grid md:grid-flow-col md:grid-cols-3 gap-4">
                <div class="font-sans col-span-1 flex no-wrap flex-row my-auto gap-2">
                    <div class="flex flex-col no-wrap gap-6">
                        <div class="text-5xl font-extrabold text-slate-800">{{data_general_home.titulo_largo_plataforma}}</div>
                        <div class="text-lg">{{data_general_home.bajada_bienvenida}}</div>
                    </div>
                </div>
                <div class="col-span-2">
                    <q-img loading class="bg-deep-orange-1" height="350px" :src="url_portada"></q-img>
                </div>
            </div>
            <show-logged-in>
                <q-separator spaced="xl" color=""></q-separator>
                <TypesCursoListaCursos />
            </show-logged-in>
        </q-page> -->
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { getDataGeneral } from '~/composables/data_general/actions'
const { apiFileURL } = apiConfig()
const loading = ref(true)
const data_general_home = await getDataGeneral() 
const url_portada = computed(function(){
    if(!data_general_home) return null;
    return `${apiFileURL}${data_general_home.foto_bienvenida.filename_disk}`
});

useHead({
    title: 'InnovaUP'
})

loading.value = false
</script>