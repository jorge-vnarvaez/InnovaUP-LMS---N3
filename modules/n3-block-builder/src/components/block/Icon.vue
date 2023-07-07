<template>
  <div>
    <v-img
      :src="$config.apiUrlV2 + '/assets/' + block.image.id"
      max-width="56"
      height="56"
      contain
    >
    </v-img>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
