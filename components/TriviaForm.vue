<template>
  <div>
    <h3 class="text-2xl font-bold">{{ trivia.titulo }}</h3>

    <q-list class="my-4">
      <q-item
        v-for="alternativa in trivia.alternativas"
        :key="alternativa.alternativas_id.id"
        tag="label" 
        v-ripple
        class="bg-white rounded drop-shadow-sm mb-2"
        >
        <q-item-section avatar>
          <q-radio v-model="selectedAlternative" :val="alternativa.alternativas_id.id" color="blue-10">
            
          </q-radio>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-xs lg:text-sm text-slate-500">{{ alternativa.alternativas_id.titulo }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-btn flat color="blue-grey-10" @click="goBack">Volver</q-btn>
    <q-spacer></q-spacer>
    <q-btn label="Responder" color="green" @click="checkAnswer" unelevated></q-btn>

    <div v-if="respuestaCorrecta == false" class="mt-8 bg-red-600 p-6 rounded drop-shadow-sm">
    <div class="flex items-center space-x-2">
        <q-icon name="error" color="white" size="sm"></q-icon>
        <span class="text-white font-bold text-lg">
          Respuesta incorrecta
        </span>
    </div>
      <span class="text-slate-100 block mt-4" v-html="trivia.descripcion"></span>
    </div>

    <div v-if="respuestaCorrecta == true" class="mt-8 bg-green-600 p-6 rounded drop-shadow-sm">
      <div class="flex items-center space-x-2">
        <q-icon name="check_circle" color="white" size="sm"></q-icon>
        <span class="text-white font-bold text-lg">
          Respuesta correcta
        </span>
      </div>
      <!-- <span class="text-slate-100 block mt-4" v-html="trivia.descripcion"></span> -->
    </div>



  </div>
</template>

<script setup>

import { getTrivia } from '~/composables/cursos/modulos/contenidos/actions'

const { is_user_logged_in, user } = userStore()


const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const trivia = await getTrivia(props.data)
const selectedAlternative = ref('')
const respuestaCorrecta = ref(null)

const route = useRouter()

definePageMeta({
  middleware: ["is-user-logged-in"]
});


const checkAnswer = () => {
  if (selectedAlternative.value === trivia.alternativa_correcta) {
    respuestaCorrecta.value = true
  } else {
    respuestaCorrecta.value = false
  }
}

function goBack () {
  route.back()
}

</script>

<style>

</style>