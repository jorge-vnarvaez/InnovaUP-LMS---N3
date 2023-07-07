<template>
    <q-page padding class="bg-slate-100">
      <div v-if="loading">Cargando...</div>
      <div v-else>
        <h1 class="text-3xl font-sans font-bold text-slate-800 mb-5">{{ contenido.nombre }}</h1>
        
        
        <!-- <VideoPlayer  :src="contenido.url_video" type="video/youtube" provider="youtube" /> -->
        <div class="grid md:grid-flow-row md:grid-cols-3">
          <div class="basis-3/4 md:col-span-2" style="min-height:200px;">
            <VideoPlayer v-if="contenido?.url_video" :src="contenido.url_video" :ratio="16/9" />

            <VideoPlayer v-if="contenido?.pdf_guia && !contenido?.url_video" 
            :data="contenido.pdf_guia" pdf :ratio="16/9" />

          </div>
           
          <div class="basis-1/4 md:px-3">
            <div class="p-2 bg-white border rounded-lg overflow-hidden">
              
              <q-card-section>
                <div class="font-sans text-bold mb-2">Contenido</div>
                <div class="font-sans text-lg">{{ contenido.nombre }}</div>
                <div class="mt-2">{{ contenido.extracto }}</div>
              </q-card-section>

              <span v-if="contenido?.pdf_guia">

                <div class="px-4">
                  <div class="font-bold pb-3">
                    Archivo guía
                  </div>

                  <CoreFile :data="{directus_files_id: contenido.pdf_guia}" />

                  <q-separator spaced="lg"></q-separator>
                </div>


              </span>

              <q-card-section v-if="contenido?.material" class="flex flex-column gap-2">
                <CoreFile v-for="(material, index) in contenido.material" :data="material" :key="index+'m'" />
              </q-card-section>
            </div>
          </div>
        </div>

        <div  class="mt-4" v-html="contenido.descripcion"></div>

        <!-- <pre>{{ contenido }}</pre> -->

      </div>
    </q-page>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getContenido } from '~/composables/cursos/modulos/contenidos/actions'
  
  const loading = ref(true)
  const contenido = ref({})
  const route = useRoute()

  definePageMeta({
    middleware: ["is-user-logged-in"]
  });
  
  onMounted(async () => {
    try {
      contenido.value = await getContenido(route.params.id)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
  