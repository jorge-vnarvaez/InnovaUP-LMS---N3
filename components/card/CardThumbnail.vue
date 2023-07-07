<template>
      <q-img v-if="foto?.filename_disk" :src="`${url_foto_tarjeta}`" :height="height"></q-img>
</template>
  
<script setup>

  import {computed} from 'vue';

  const { getApiUrl } = authApi()
  const apiUrl        = await getApiUrl();

  const props = defineProps({
    foto: Object,
    height: {
      type: [String, Number],
      default: '250px'
    }
  });

  const url_foto_tarjeta = computed(() => {
    if(!props.foto) return null;
    return `${apiUrl}/assets/${props.foto.filename_disk}`;
  });
</script>
  