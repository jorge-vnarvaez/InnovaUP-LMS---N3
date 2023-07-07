<template>
  <div class="border bg-white rounded-lg overflow-hidden flex flex-col justify-between">
    <span>
      <q-img v-if="foto_tarjeta?.filename_disk" :src="`${url_foto_tarjeta}`" height="250px"></q-img>
      <q-card-section>
        <div class="text-xl font-sans font-bold mb-3">{{ nombre }}</div>
        <div class="font-sans line-clamp-3">{{ extracto }}</div>
      </q-card-section>
    </span>
    <q-card-actions class="">
      <q-btn :to="`/programas/${ id }`" flat>Ver más</q-btn>
    </q-card-actions>
  </div>
</template>

<script setup>

import { computed } from 'vue';

const { getApiUrl } = authApi()
const apiUrl        = await getApiUrl();

const props = defineProps({
  id: String,
  nombre: String,
  extracto: String,
  descripcion: String,
  foto_tarjeta: Object,
});

const url_foto_tarjeta = computed(() => {
  if(!props.foto_tarjeta) return null;
  return `${apiUrl}/assets/${props.foto_tarjeta.filename_disk}`;
});


</script>
