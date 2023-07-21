<template>
    <div>
    <q-page v-if="loading" padding class="bg-slate-100">
        <div >Cargando...</div>
    </q-page>

    <div v-else>
      <div class="bg-slate-900 text-white md:h-[450px] lg:h-[250px]">
        <q-page padding>
          <div class="grid md:grid-flow-row md:grid-cols-3 lg:grid-cols-12 py-5">
            <div class="col-span-12 lg:col-span-6">
                <h1 class="text-3xl font-sans font-black">{{ curso.nombre }}</h1>
                <div class="mt-4 text-xl font-medium font-sans leading-loose lg:leading-loose">{{ curso.extracto }}</div>
            </div>

              <!-- <CardThumbnail :foto="curso.foto_tarjeta" /> -->
          </div>
        </q-page>
      </div>
      <q-page padding class="bg-slate-100">
      <div>
        <div class="grid md:grid-flow-row md:grid-cols-3 lg:gap-10 py-5 lg:py-0">
            <div class="w-full">
                <div class="grid grid-cols-12 lg:gap-10 py-5">
                  <span v-if="curso.material && curso.material.length > 0" class="col-span-12 lg:col-span-8">
                    <!-- <q-separator spaced="xl"></q-separator> -->
                    <div class="font-sans bg-slate-100 py-5 rounded-lg">
                      <div class="mb-3 font-bold">Archivos Curso</div>
                      <div class="flex flex-col gap-2">
                        <CoreFile v-for="(archivo, index) in curso.material" :key="index+'a'" :data="archivo" />
                      </div>
                    </div>
                  </span>
                </div>
            </div>
            <div class="md:col-span-2 font-sans text-lg" v-html="curso.descripcion"></div>
        </div>
        <!-- <q-separator spaced class="p-[1px]" color="orange"></q-separator> -->
        <!-- <div class="text-3xl font-sans font-bold">Cuerpo docente</div> -->
        

        <div class="font-sans font-bold text-3xl">Profesores curso</div>
        <q-separator spaced="lg" size="0px" color="orange"></q-separator>

        <div v-if="curso.profesores_curso" class="column gap-3">
            <CoreUser v-for="(profesor, index) in curso.profesores_curso" :data="profesor" :key="index+'p'" />
        </div>



        <q-separator spaced="xl" class="p-[1px]" size="3px" color="orange"></q-separator>

        <div v-if="curso.modulos_cursos">
            <div class="text-3xl font-sans font-bold">Módulos del curso</div>
             
                  <q-list bordered class="rounded-borders p-3 mt-5">
                      <q-expansion-item
                          v-for="(modulo, index_modulo) in curso.modulos_cursos" :key="index_modulo+'m'"
                          :label="modulo.modulos_cursos_id.nombre"
                          :caption="modulo.modulos_cursos_id.extracto"
                          header-class="text-xl font-medium font-sans"
                          default-opened
                          class=""
                      >
                          <div class="">
                              <q-card-section>
                                  <!-- Inner modulo -->
                                  <span v-for="(contenido, index_contenido) in modulo.modulos_cursos_id.contenidos_modulo" :key="index_contenido+'c'">
                                      <nuxt-link 
                                      :to="contenido.contenidos_modulos_id.formato !== 'link' ? `/contenido/${contenido.contenidos_modulos_id.id}` : `${contenido.contenidos_modulos_id.link_externo}`" 
                                      :target="contenido.contenidos_modulos_id.formato !== 'link' ? '_self' : '_blank'"
                                      tag="button"
                                      >
                                          <div v-ripple bordered flat class="my-2 bg-slate-300 rounded-lg overflow-hidden">
                                              <q-card-section class="flex" >
                                                  <span class="q-focus-helper"></span>
                                                  <div class="inline-flex flex-row no-wrap items-center gap-2 w-full">
                                                      <div>
                                                          <div class="text-lg font-medium font-sans">{{ contenido.contenidos_modulos_id.nombre }}</div>
                                                          <div v-if="contenido.contenidos_modulos_id.formato != 'link'" class="text-md font-sans">{{ contenido.contenidos_modulos_id.extracto }}</div>
                                                          <div v-if="contenido.contenidos_modulos_id.formato == 'link' &&  !diasSesion(modulo)" class="text-md font-sans">{{ contenido.contenidos_modulos_id.extracto }}</div>
                                                          <div v-if="contenido.contenidos_modulos_id.formato == 'link' &&  diasSesion(modulo)" class="text-md font-sans">
                                                            La sesión se llevará a cabo el {{ date.formatDate(modulo.modulos_cursos_id.fecha_sesion, 'DD/MM/YYYY') }}, hasta entonces te invitamos a revisar el material de apoyo.
                                                          </div>
                                                      </div>
                                                      <div class="mx-auto"></div>
                                                      <div class="inline-flex p-2 bg-slate-700 rounded-full">                                                
                                                          <span v-if="contenido.contenidos_modulos_id.formato" class="text-slate-200">
                                                            <q-icon v-if="contenido.contenidos_modulos_id.formato == 'video'" name="snart_display" size="20px"></q-icon>
                                                            <q-icon v-if="contenido.contenidos_modulos_id.formato == 'link'" name="link" size="20px"></q-icon>
                                                            <q-icon v-if="contenido.contenidos_modulos_id.formato == 'presentacion'" name="picture_as_pdf" size="20px"></q-icon>
                                                            <q-icon v-if="contenido.contenidos_modulos_id.formato == 'trivia'" name="content_paste" size="20px"></q-icon>
                                                            <q-tooltip class="bg-slate-900">
                                                              <span v-if="contenido.contenidos_modulos_id.formato == 'video'">Video</span>
                                                              <span v-if="contenido.contenidos_modulos_id.formato == 'link'">Link externo</span>
                                                              <span v-if="contenido.contenidos_modulos_id.formato == 'presentacion'">Presentación</span>
                                                              <span v-if="contenido.contenidos_modulos_id.formato == 'trivia'">Trivia</span>
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
          </div>
        </div>
      </q-page>
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { getCurso } from '~/composables/cursos/actions'
  import { date } from 'quasar'
  
  const loading = ref(true)
  const curso = ref({})
  const route = useRoute()
  const trivia = ref(false)

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

  function checkIfModuloHasTrivia(trivia_id) {
    if(trivia_id) {
      trivia.value = true
    } else {  
      trivia.value = false
    }
  }

  function diasSesion(modulo) {
    return date.getDateDiff(modulo.modulos_cursos_id.fecha_sesion, new Date(), 'days') > 0
  }
</script>
  