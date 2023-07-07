<template>
  <div>
    <!-- <div v-if="['Rounded Icon'].includes(block.button_type)">Rounded Icon</div> -->

    <div v-if="['Rounded Icon Text Outer'].includes(block.button_type)">
      <v-btn icon rounded outlined x-large plain>
        <v-icon small>{{ block.icon }}</v-icon>
      </v-btn>
      <v-btn text plain>
        {{ block.text }}
      </v-btn>
    </div>


    <div v-if="['Rounded Outlined Text'].includes(block.button_type)">
        <v-btn rounded outlined small plain :color="block.text_color" :to="block.href">
            {{ block.text }}
        </v-btn>
    </div>

    <div v-if="['Outlined Icon + Text'].includes(block.button_type)">
          <v-btn outlined  plain :color="block.text_color" :to="block.href">
                <v-icon class="pr-4 py-2">mdi-plus</v-icon>
                <!-- <v-divider vertical class="text-slate-800 py-2" :color="block.text_color"></v-divider> -->
                <span class="px-4 py-2">{{ block.text }}</span>
          </v-btn>
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
};
</script>

<style>
</style>