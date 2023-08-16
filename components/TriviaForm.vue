<template>
  <div>
    <div v-if="loading">Cargando...</div>
    <div v-if="!loading && trivia">
      <div class="bg-white p-6">
        <p class="text-xl font-bold mb-2">{{ trivia?.titulo }}</p>
      </div>


      <div class="flex justify-between p-6">
          <div v-if="trivia?.seleccion_multiple" class="font-sans text-slate-500 flex align-center mb-0">
            Selecciona una o más respuestas correctas
          </div>

          <div v-if="!trivia?.seleccion_multiple" class="font-sans text-slate-500 flex align-center mb-0">
            Selecciona una respuesta correcta
          </div>

          <div class="flex space-x-2 lg:space-x-4 mt-2 lg:mt-0">
            <q-btn @click="showSolution" outline color="blue-grey-9" size="12px">
              <!-- <Icon name="ri:question-mark" class="mr-2" /> -->
              Ayuda
            </q-btn>
            
          </div>
      </div>
     
      <div class="bg-white px-6 py-4">
        <q-option-group
          v-if="trivia?.seleccion_multiple"
          v-model="alternativas_seleccionadas"
          :options="
            trivia?.alternativas?.map((alternativa) => {
              return {
                label: alternativa?.alternativas_id?.titulo,
                value: alternativa?.alternativas_id?.id,
              };
            })
          "
          color="blue"
          type="checkbox"
        >
        </q-option-group>

        <q-list v-if="!trivia.seleccion_multiple">
          <q-item
            v-for="alternativa in trivia.alternativas"
            :key="alternativa.alternativas_id.id"
            tag="label"
            v-ripple
          >
          <q-item-section>
            <q-radio
              v-model="alternativa_seleccionada"
              :val="alternativa"
              @update:model-value="alternativaWasSelected"
            >
              <template #default>
                <div class="text-neutral-600">
                  {{ alternativa.alternativas_id.titulo }}
                </div>
              </template>
            </q-radio>
          </q-item-section>
        </q-item>
      </q-list>
      </div>

      <div class="flex space-x-4">
        <q-btn @click="checkAnswer" color="blue-grey-9" size="12px" class="mt-4 mb-6" unelevated>
            Responder
        </q-btn>
      </div>


        <div v-if="mostrar_solucion && respuesta_correcta == null" class="border-2 border-slate-800 p-6 rounded-lg">
          <p class="text-xl font-bold mb-2">Solución</p>
          <span class="block">
            {{ trivia.definicion }}
          </span>
          <q-btn color="blue-grey-10" class="mt-4" unelevated @click="nuevoIntento">
            Volver a intentar
          </q-btn>
        </div>

        <div v-if="respuesta_correcta == false" class="border-2 border-red-600 p-6 rounded-lg">
          <p class="text-xl font-semibold mb-2 text-red-600">Respuesta incorrecta</p>
          <span class="text-red-600 font-light block">
            {{ trivia.definicion }}
          </span>
           <q-btn color="blue-grey-10" class="mt-4" unelevated @click="nuevoIntento">
            Volver a intentar
          </q-btn>
        </div>

        <div v-if="respuesta_correcta == true" class="border-2 border-green-500 p-6 rounded-lg">
          <p class="text-xl font-semibold mb-2 text-green-500">Respuesta correcta</p>
          <q-btn color="green" class="mt-4" unelevated @click="goBack">
            Seguir con el curso
          </q-btn>
        </div>
     
    </div> 
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRouter();

const loading = ref(true);
const trivia = ref(null);
const alternativas_seleccionadas = ref([]);
const alternativa_seleccionada = ref(null);
const respuesta_correcta = ref(null);
const mostrar_solucion = ref(false);
import { getTrivia, checkSeleccionadas } from '~/composables/cursos/modulos/contenidos/actions.js'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

onMounted(async () => {
  try {
    const data = await getTrivia(props.data);
    trivia.value = data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

const showSolution = () => {
    respuesta_correcta.value = null;
    mostrar_solucion.value = !mostrar_solucion.value;
}

const alternativaWasSelected = (alternativa) => {
  alternativas_seleccionadas.value = [];
  alternativas_seleccionadas.value.push(alternativa?.alternativas_id?.id);
};

const checkAnswer = async () => {
  mostrar_solucion.value = false;
  respuesta_correcta.value = await checkSeleccionadas(
    trivia.value.id,
    alternativas_seleccionadas.value
  ).then((res) =>  res.json())
};


function goBack() {
   route.back()
};

function nuevoIntento() {
  mostrar_solucion.value = false;
  respuesta_correcta.value = null;
  alternativas_seleccionadas.value = [];
  alternativa_seleccionada.value = null;
}
</script>

<style>
</style>