<template>
    <q-page padding class="bg-slate-100">
      <div v-if="loading">Cargando curso...</div>
      <div v-else>
        <!-- <pre>{{ curso }}</pre> -->

        <h1 class="text-3xl font-sans font-bold text-slate-800">{{ curso.nombre }}</h1>
        <div class="grid md:grid-flow-row md:grid-cols-3 gap-10 py-5">
            <div class="w-full md:min-w-[350px] md:w-[350px]">
                <div class="border-2 border-slate-300 rounded-lg overflow-hidden">
                    <CardThumbnail height="150px" :foto="curso.foto_tarjeta" />
                    <!-- <div class="p-8 font-bold text-slate-800">{{ curso.extracto }}</div> -->
                </div>

                <span v-if="curso.material && curso.material.length > 0">
                  <!-- <q-separator spaced="xl"></q-separator> -->
                  <div class="font-sans bg-slate-100 p-5 rounded-lg">
                    <div class="mb-3 font-bold">Archivos Curso</div>
                    <div class="flex flex-col gap-2">
                      <CoreFile v-for="(archivo, index) in curso.material" :key="index+'a'" :data="archivo" />
                    </div>
                  </div>
                </span>

            </div>
            <div class="md:col-span-2 font-sans text-lg" v-html="curso.descripcion"></div>
        </div>
        <q-separator spaced class="p-[1px]" color="orange"></q-separator>
        <!-- <div class="text-3xl font-sans font-bold">Cuerpo docente</div> -->
        

        <div class="font-sans font-bold text-2xl">Profesores curso</div>
        <q-separator spaced="lg" size="0px" color="orange"></q-separator>

        <div class="column gap-3">
            <CoreUser v-for="(profesor, index) in curso.profesores_curso" :data="profesor" :key="index+'p'" />
        </div>



        <q-separator spaced="xl" class="p-[1px]" size="3px" color="orange"></q-separator>
        
        <div class="text-3xl font-sans font-bold">Módulos del curso</div>
        <!-- {{ curso.modulos_cursos }} -->
        <q-list bordered class="rounded-borders p-3 mt-5">
            <q-expansion-item
                v-for="(modulo, index_modulo) in curso.modulos_cursos" :key="index_modulo+'m'"
                :label="modulo.modulos_cursos_id.nombre"
                :caption="modulo.modulos_cursos_id.extracto"
                header-class="text-xl font-medium font-sans"
                class=""
                default-opened
            >
                <div class="">
                    <q-card-section>
                        <!-- Inner modulo -->
                        <span v-for="(contenido, index_contenido) in modulo.modulos_cursos_id.contenidos_modulo" :key="index_contenido+'c'">
                            <nuxt-link 
                            :to="contenido.contenidos_modulos_id.formato !== 'link' ? `/contenido/${contenido.contenidos_modulos_id.id}` : `${contenido.contenidos_modulos_id.link_externo}`" 
                            :target="contenido.contenidos_modulos_id.formato !== 'link' ? '_self' : '_blank'">
                                <div v-ripple bordered flat class="my-2 bg-slate-300 rounded-lg overflow-hidden">
                                    <q-card-section class="flex">
                                        <span class="q-focus-helper"></span>
                                        <div class="inline-flex flex-row no-wrap items-center gap-2 w-full">
                                            <div>
                                                <div class="text-lg font-medium font-sans">{{ contenido.contenidos_modulos_id.nombre }}</div>
                                                <div class="text-md font-sans">{{ contenido.contenidos_modulos_id.extracto }}</div>
                                            </div>
                                            <div class="mx-auto"></div>
                                            <div class="inline-flex p-2 bg-slate-700 rounded-full">                                                
                                                <span v-if="contenido.contenidos_modulos_id.formato" class="text-slate-200">
                                                  <!-- <Icon size="20px" name="mdi:presentation-play" v-if="contenido.contenidos_modulos_id.formato == 'video'" />
                                                  <Icon size="20px" name="mdi:link-variant" v-if="contenido.contenidos_modulos_id.formato == 'link'" />
                                                  <Icon size="20px" name="mdi:layers" v-if="contenido.contenidos_modulos_id.formato == 'presentacion'" /> -->
                                                  <q-tooltip class="bg-slate-900">
                                                    <span v-if="contenido.contenidos_modulos_id.formato == 'video'">Video</span>
                                                    <span v-if="contenido.contenidos_modulos_id.formato == 'link'">Link externo</span>
                                                    <span v-if="contenido.contenidos_modulos_id.formato == 'presentacion'">Presentación</span>
                                                  </q-tooltip>
                                                </span>
                                            </div>
                                        </div>
                                    </q-card-section>
                                </div>
                            </nuxt-link>
                        </span>
                        <!-- Inner modulo -->
                    </q-card-section>
                </div>
            </q-expansion-item>
           
            </q-list>

        <!-- <pre>{{ curso }}</pre> -->

      </div>
    </q-page>
</template>
<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getCurso } from '~/composables/cursos/actions'
  
  const loading = ref(true)
  const curso = ref({})
  const route = useRoute()

  definePageMeta({
    middleware: ["is-user-logged-in"]
  });
  
  onMounted(async () => {
    try {
      curso.value = await getCurso(route.params.id)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  })
</script>
  