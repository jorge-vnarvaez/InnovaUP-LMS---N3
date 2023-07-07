<template>
  <div id="wrapper">
        <BlockComponent
          v-for="block in blocks"
          :key="block.id"
          :block="block"
          id="item"
        ></BlockComponent>
  </div>
</template>

<script>
export default {
  props: {
    blocks: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="postcss">

#item {
  @apply flex flex-wrap;
}

#wrapper {
  @apply snap-x space-x-8;
  @apply pb-20;
  @apply flex;
  overflow-x: scroll;
}

#wrapper::-webkit-scrollbar {
  height: 8px;
}

#wrapper::-webkit-scrollbar-track {
  background: #f1f5f9;
}
#wrapper::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 5px;
  max-width: 100px;
}
</style>
