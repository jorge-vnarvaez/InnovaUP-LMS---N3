<template>
  <div>
    {{ data }}
  </div>
</template>

<script setup>

const props = defineProps({
  fecha_session: Object,
  data: {
    type: Object,
    default: () => ({})
  }
});

</script>

<style>

</style>