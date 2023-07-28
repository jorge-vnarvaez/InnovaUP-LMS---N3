<template>
  <div>
    <div v-if="loading">Cargando trivia...</div>

    <div v-if="trivia">
      <h3 class="text-2xl font-bold">{{ trivia.titulo }}</h3>

      <p v-if="trivia.seleccion_multiple" class="font-sans text-slate-400">Pregunta de selección multiple.</p>

      <q-list v-if="!trivia.seleccion_multiple" class="my-4">
        <q-item
          v-for="alternativa in trivia.alternativas"
          :key="alternativa.alternativas_id.id"
          tag="label"
          v-ripple
        >
          <q-item-section>
            <q-radio
              v-model="selectedAlternative"
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

      <q-option-group
        v-if="trivia.seleccion_multiple"
        class="my-4"
        v-model="alternativasSelected"
        :options="
          trivia.alternativas.map((alternativa) => {
            return {
              label: alternativa.alternativas_id.titulo,
              value: alternativa.alternativas_id.id,
            };
          })
        "
        color="blue"
        type="checkbox"
      >
      </q-option-group>

      <div class="mt-4">
        <q-btn flat color="blue-grey-10" @click="goBack">Volver</q-btn>
        <q-btn
          label="Responder"
          color="teal"
          @click="checkAnswer"
          unelevated
        ></q-btn>
      </div>


      <div
        v-if="respuestaCorrecta == false"
        class="bg-red-600 text-white  p-6 lg:p-8  mt-8 rounded"
      >
        <p class="text-xl font-bold">Respuesta Incorrecta</p>
        <span class="block mt-2" v-if="verSolucion">
          {{ trivia.definicion }}
        </span>

        <span class="block mt-2" v-if="!verSolucion">
          Lo sentimos, tu respuesta no es correcta. Vuelve a intentarlo.
        </span>

        <!-- <q-btn v-if="verSolucion == false" color="green" unelevated class="mt-4 mr-4"  @click="verSolucion = true">
          <q-icon name="mdi-eye"></q-icon>
          Ver solución
        </q-btn> -->

        <q-btn v-if="verSolucion == false" color="green" icon="visibility" unelevated class="mt-4 mr-4" label="Ver Solución"  @click="verSolucion = true" />

        <q-btn v-if="verSolucion == true" color="green" icon="visibility_off" unelevated class="mt-4 mr-4" label="Ocultar"  @click="verSolucion = false" />


        <q-btn color="white" class="mt-4" outline @click="nuevoIntento">
          Volver a intentar
        </q-btn>
      </div>

      <div v-if="respuestaCorrecta" class="bg-green-500 text-white p-6 lg:p-8 rounded mt-8">
        <p class="text-xl font-bold">Felicitaciones!</p>
        <span class="block mt-2">
          Haz respondido correctamente este cuestionario.
        </span>

        <q-btn color="white" class="mt-4" outline @click="goBack">
          Seguir con el curso
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import {
  getTrivia,
  checkSeleccionadas,
} from "~/composables/cursos/modulos/contenidos/actions";
const { is_user_logged_in, user } = userStore();

const props = defineProps({
  data: {
    type: String,
    required: true,
  },
});
const trivia = ref(null);
const alternativasSelected = ref([]);
const selectedAlternative = ref(null);
const respuestaCorrecta = ref(null);
const loading = ref(true);
const verSolucion = ref(false);

const route = useRouter();

onMounted(async () => {
  try {
    trivia.value = await getTrivia(props.data);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

definePageMeta({
  middleware: ["is-user-logged-in"],
});

const alternativaWasSelected = async (alternativa) => {
  selectedAlternative.value = alternativa;

  if (!trivia.seleccion_multiple) {
    alternativasSelected.value = [];
    alternativasSelected.value.push(alternativa.alternativas_id.id);
  }
};

const checkAnswer = async () => {
  respuestaCorrecta.value = await checkSeleccionadas(
    trivia.value.id,
    alternativasSelected.value
  ).then((res) => {
    return res.json();
  });
};

function nuevoIntento() {
  respuestaCorrecta.value = null;
  alternativasSelected.value = [];
  selectedAlternative.value = null;
}

function goBack() {
  route.back();
}
</script>

<style>
</style>