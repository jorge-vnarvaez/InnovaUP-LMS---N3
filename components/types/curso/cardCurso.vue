<template>
  <div class="bg-white rounded-lg flex flex-col justify-between">
    <span>
      <q-img v-if="foto_tarjeta?.filename_disk" :src="`${url_foto_tarjeta}`" height="250px"></q-img>
      <div class="p-5">
        <div class="text-xl font-sans font-bold mb-3">{{ nombre }}</div>
        <div class="font-sans">{{ extracto }}</div>
      </div>
    </span>
    <div class="p-3">
      <q-btn :to="`/curso/${ id }`" flat>Ver más</q-btn>
    </div>
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
