<template>
  <div class="grid grid-cols-12 col-span-12">
    <span
      v-if="block.title"
      class="block text-2xl col-span-12 font-medium mb-4 text-slate-700"
      >{{ block.title }}</span
    >
    <span
      v-if="block.description"
      class="block text-xl col-span-12 lg:col-span-6 mb-8 text-slate-600"
      v-html="block.description"
    ></span>


    <div class="col-span-12">
      <div
        class="mb-2 text-slate-700 w-12/12 lg:w-7/12"
        v-for="feature in block.features_list"
        :key="feature.id"
        @mouseover="active_feature = feature.id"
      >
        <div
          :class="[
            'bg-slate-100 px-4 py-2 w-full border-l-4 cursor-pointer',
            active_feature == feature.id
              ? border_color(block.bg_color)
              : negative_border_color(block.bg_color),
          ]"
        >
          <span class="block font-medium">{{ feature.title }}</span>
        </div>
      </div>
    </div>
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
  data() {
    return {
      active_feature: null,
    };
  },
  methods: {
    border_color(hex_block_color) {
      return {
        "border-l-pink-600": hex_block_color === "#E11D48",
        "border-l-blue-600": hex_block_color === "#0070F3",
        "border-l-green-600": hex_block_color === "#22C55E",
        "border-l-yellow-600": hex_block_color === "#F59E0B",
        "border-l-purple-600": hex_block_color === "#8B5CF6",
        "border-l-red-600": hex_block_color === "#EF4444",
      };
    },
    negative_border_color(hex_block_color) {
      return {
        "border-l-pink-200": hex_block_color === "#E11D48",
        "border-l-blue-600": hex_block_color === "#0070F3",
        "border-l-green-600": hex_block_color === "#22C55E",
        "border-l-yellow-600": hex_block_color === "#F59E0B",
        "border-l-purple-600": hex_block_color === "#8B5CF6",
        "border-l-red-600": hex_block_color === "#EF4444",
      };
    },
  },
};
</script>

<style></style>
