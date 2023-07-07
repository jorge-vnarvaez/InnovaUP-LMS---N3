<template>
  <span
    @click="setActiveInnerTab(block.id)"
    :class="[
      activeInnerTabClass(block.id),
      block.mobile_font_size,
      block.font_size,
      'cursor-pointer block',
    ]"
    >{{ block.title }}</span
  >
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      default: "default",
    },
  },
  methods: {
    setActiveInnerTab(block_id) {
      this.$store.commit('tabs/setActiveInnerTab', block_id)
    }
  },
  computed: {
    activeInnerTab() {
      return this.$store.getters['tabs/getActiveInnerTab'];
    },
    activeInnerTabClass() {
      return (id) => {
        return this.activeInnerTab == id ? 'text-slate-800 font-medium' : 'text-slate-400';
      }
    }
  }
};
</script>

<style></style>
