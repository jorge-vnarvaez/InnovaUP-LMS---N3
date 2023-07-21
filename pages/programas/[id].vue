<template>
    <q-page padding class="bg-slate-100">
      <div v-if="loading">Cargando programa...</div>
      <div v-else>
        <!-- <pre>{{ programa }}</pre> -->
        <h1 class="text-5xl font-sans text-slate-800 font-bold">{{ programa.nombre }}</h1>
        <div class="pb-10 pt-5">
          <div class="grid md:flex md:grid-cols-3 gap-10">

              <!-- Tarjeta principal -->
              <div class="w-full md:min-w-[350px] md:w-[350px]">
                  <div class="border-2 border-slate-300 rounded-lg overflow-hidden">
                      <CardThumbnail width="100%" height="180px" :foto="programa.foto_tarjeta" />
                      <div class="text-md p-8 font-bold">{{ programa.extracto }}</div>
                  </div>

                  <span v-if="programa.material && programa.material.length > 0">
                    <q-separator spaced="xl"></q-separator>
                    <div class="font-sans bg-slate-100 p-5 rounded-lg">
                      <div class="mb-3 font-bold">Archivos Programa</div>
                      <div class="flex flex-col gap-2">
                        <CoreFile v-for="(archivo, index) in programa.material" :key="index+'a'" :data="archivo" />
                      </div>
                    </div>
                  </span>

              </div>
              <!-- Tarjeta principal -->
              <div class="md:col-span-2">
                <div class="font-sans text-lg leading-7" v-html="programa.descripcion"></div>
              </div>
          </div>
        </div>
        <!-- <q-separator spaced class="p-[1px]" color="orange"></q-separator>
        <div class="text-3xl font-sans font-bold">Cuerpo docente</div> -->

        <q-separator spaced class="p-[1px]" color="orange"></q-separator>
        <div class="text-3xl font-sans font-bold">Cursos del programa</div>
        <scrollable v-if="programa.cursos" :n="programa.cursos.length" 
            gap="15px" class="py-5"
            el-min-height="300px" el-min-width="350px" el-max-width="350px" snap min-height="400px" width="100%" x-scroll>
            <types-curso-card-curso
            v-for="(curso, index) in programa.cursos" :key="index"
            :nombre="curso.cursos_id.nombre"
            :descripcion="curso.cursos_id.descripcion" :id="curso.cursos_id.id"
            :extracto="curso.cursos_id.extracto" :foto_tarjeta="curso.cursos_id.foto_tarjeta"></types-curso-card-curso>
        </scrollable>

      </div>
    </q-page>
  </template>
  
<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getPrograma } from '~/composables/programas/actions'
  
  const loading = ref(true)
  const programa = ref({})
  const route = useRoute()

  definePageMeta({
    middleware: ["is-user-logged-in"]
  });
  
  onMounted(async () => {
    try {
      programa.value = await getPrograma(route.params.id)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
  