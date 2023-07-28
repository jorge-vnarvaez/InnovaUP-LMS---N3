<template>
    <q-page padding class="bg-slate-100">
        <div v-if="loading" >Cargando...</div>

        <div v-else>
          <div>
            <div v-if="!curso.seccion">
                <h1 class="text-3xl font-sans font-bold text-slate-800">{{ curso.nombre }}</h1>
                <div class="grid md:grid-flow-row md:grid-cols-3 gap-10 py-5">
                    <div class="w-full md:min-w-[350px] md:w-[350px]">
                        <div class="border-2 border-slate-300 rounded-lg overflow-hidden">
                            <CardThumbnail height="200px" width="100%" :foto="curso.foto_tarjeta" />
                            <div class="p-8 font-bold text-slate-800">{{ curso.extracto }}</div>
                        </div>

                    </div>
                    <div class="md:col-span-2 font-sans text-lg" v-html="curso.descripcion"></div>
                </div>
            </div>

            <div v-if="curso.seccion" class="grid grid-cols-12">
              <block v-for="block in curso?.seccion?.blocks" :key="block.blocks_id.id" :block="block.blocks_id" :data="curso">

              </block>
            </div>


            <span v-if="curso.material && curso.material.length > 0">
                <q-separator spaced="xl"></q-separator>
                <div class="font-sans bg-slate-100 p-5 rounded-lg">
                  <div class="mb-3 font-bold">Archivos Curso</div>
                  <div class="flex flex-col gap-2">
                    <CoreFile v-for="(archivo, index) in curso.material" :key="index+'a'" :data="archivo" />
                  </div>
                </div>
            </span>
            
            <div v-if="curso?.profesores_curso && Array.isArray(curso?.profesores_curso) && curso?.profesores_curso?.length > 0" class="column gap-3">
                <div class="font-sans font-bold text-3xl">Profesores curso</div>
                <q-separator spaced="lg" size="0px" color="orange"></q-separator>
                <CoreUser v-for="(profesor, index) in curso.profesores_curso" :data="profesor" :key="index+'p'" />
                <q-separator spaced="xl" class="p-[1px]" size="3px" color="orange"></q-separator>
            </div>

            <div v-if="curso?.modulos_cursos && Array.isArray(curso?.modulos_cursos) && curso?.modulos_cursos?.length > 0">
              
                <div class="text-3xl font-sans font-bold">Módulos del curso</div>
                      <q-list bordered class="rounded-borders p-3 mt-5">
                          <q-expansion-item
                              v-for="(modulo, index_modulo) in curso.modulos_cursos" :key="index_modulo+'m'"
                              :label="modulo?.modulos_cursos_id?.nombre"
                              :caption="modulo?.modulos_cursos_id?.extracto"
                              header-class="text-xl font-medium font-sans"
                              default-opened
                              class=""
                          >
                              <div class="">
                                      <q-card-section>
                                        <span v-for="(contenido, index_contenido) in modulo?.modulos_cursos_id?.contenidos_modulo" :key="index_contenido+'c'">

                                          <nuxt-link 
                                          :to="
                                          contenido?.contenidos_modulos_id?.formato !== 'link' ? 
                                            `/contenido/${contenido.contenidos_modulos_id.id}` : 
                                              `${contenido?.contenidos_modulos_id?.link_externo}`
                                          "
                                          :target="
                                            contenido?.contenidos_modulos_id?.formato !== 'link' ? 
                                              '_self' : 
                                                '_blank'
                                          ">
                                            <div v-ripple bordered flat class="my-2 bg-slate-300 rounded-lg overflow-hidden">
                                                  <q-card-section class="flex">
                                                      <span class="q-focus-helper"></span>
                                                      <div class="inline-flex flex-row no-wrap items-center gap-2 w-full">
                                                          <div>
                                                              <div class="text-lg font-medium font-sans">{{ contenido?.contenidos_modulos_id?.nombre }}</div>
                                                              <div v-if="contenido?.contenidos_modulos_id?.formato != 'link'" class="text-md font-sans">{{ contenido?.contenidos_modulos_id?.extracto }}</div>
                                                              <div v-if="contenido?.contenidos_modulos_id?.formato == 'link' &&  !diasSesion(modulo)" class="text-md font-sans">{{ contenido?.contenidos_modulos_id?.extracto }}</div>
                                                              <div v-if="contenido?.contenidos_modulos_id?.formato == 'link' &&  diasSesion(modulo)" class="text-md font-sans">
                                                                La sesión se llevará a cabo el {{ date.formatDate(modulo?.modulos_cursos_id?.fecha_sesion, 'DD/MM/YYYY [a las] HH:mm [hrs]') }}, hasta entonces te invitamos a revisar el material de apoyo.
                                                              </div>
                                                          </div>
                                                          <div class="mx-auto"></div>
                                                          <div class="inline-flex p-2 bg-slate-700 rounded-full">                                                
                                                              <span v-if="contenido?.contenidos_modulos_id?.formato" class="text-slate-200">
                                                                <q-icon v-if="contenido?.contenidos_modulos_id?.formato == 'video'" name="snart_display" size="20px"></q-icon>
                                                                <q-icon v-if="contenido?.contenidos_modulos_id?.formato == 'link'" name="link" size="20px"></q-icon>
                                                                <q-icon v-if="contenido?.contenidos_modulos_id?.formato == 'presentacion'" name="picture_as_pdf" size="20px"></q-icon>
                                                                <q-icon v-if="contenido?.contenidos_modulos_id?.formato == 'trivia'" name="content_paste" size="20px"></q-icon>
                                                                <q-tooltip class="bg-slate-900">
                                                                  <span v-if="contenido?.contenidos_modulos_id?.formato == 'video'">Video</span>
                                                                  <span v-if="contenido?.contenidos_modulos_id?.formato == 'link'">Link externo</span>
                                                                  <span v-if="contenido?.contenidos_modulos_id?.formato == 'presentacion'">Presentación</span>
                                                                  <span v-if="contenido?.contenidos_modulos_id?.formato == 'trivia'">Trivia</span>
                                                                </q-tooltip>
                                                              </span>
                                                          </div>
                                                      </div>
                                                  </q-card-section>
                                              </div>
                                          </nuxt-link>
                                        </span>
                                      </q-card-section>
                              </div>
                          </q-expansion-item>
                  </q-list>
              </div>
            </div>
    </div>
    </q-page>
</template>
<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getCurso } from '~/composables/cursos/actions'
  import { date } from 'quasar'

  import { getContenido } from "~/composables/cursos/modulos/contenidos/actions";

  
  const loading = ref(true)
  const curso = ref({})
  const route = useRoute()
  const trivia = ref(false)
  const linkres = ref({})

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

  // const onLinkClick = async(linkname) => {

  //   console.log('linkname', linkname)
  //   linkres.value = await getContenido(linkname);
  //   // send to route /contenido/${linkname}
  //   await navigateTo(`/contenido/${linkname}`)

    
  
  // }

  function checkIfModuloHasTrivia(trivia_id) {
    if(!trivia_id) {
      trivia.value = false
      return
    }
    trivia.value = true
    return
  }

  function diasSesion(modulo) {
    if (!modulo?.modulos_cursos_id?.fecha_sesion) return false
    return date.getDateDiff(modulo?.modulos_cursos_id?.fecha_sesion, new Date(), 'days') > 0
  }
</script>
  