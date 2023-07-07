<template>
    <div class="flex flex-col justify-center">
    <span 
      v-if="block.long_text" 
      class="block leading-loose lg:leading-loose font-inter" 
      :class="[block.align, block.mobile_font_size, block.font_size]" 
      :style="{
        color: block.text_color,
      }"
      v-html="block.long_text">
    </span>
  </div>
</template>

<script>
export default {
    props: {
        block: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>