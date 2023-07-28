<template>
  <div :class="`col-span-${mobile_size} lg:col-span-${size} py-2`">
    
    <div v-if="['Group'].includes(block.format)" class="grid grid-cols-12">
      <block v-for="child in block.childs" :key="child.id" :block="child" :data="data"></block>
    </div>

    <div v-if="['Text'].includes(block.format)">
      <span :class="[block.mobile_font_size, block.font_size, 'font-bold']">{{ text }}</span>
    </div>

    <div v-if="['Long Text'].includes(block.format)">
      <span :class="[block.mobile_font_size, block.font_size, 'font-light']">{{ long_text }}</span>
    </div>

    <div v-if="['Image'].includes(block.format)">
      <q-img :src="url_foto_tarjeta" width="300" height="300" class="rounded-lg"></q-img>
    </div>
  </div>
</template>

<script setup>

import { apiConfig } from '~/composables/apiConfig'

const { apiFileURL } = apiConfig()


const props = defineProps({
  block: {
    type: Object,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})

const size = computed(() => {
  if (props.block.size) {
    return parseInt(props.block.size)
  } else {
    return 12
  }
})

const mobile_size = computed(() => {
  if (props.block.mobile_size) {
    return parseInt(props.block.mobile_size)
  } else {
    return 12
  }
})

const text = computed(() => {
  if (props.block.text == "{{ titulo }}") {
    return props.data.nombre
  } 
})

const long_text = computed(() => {
  if (props.block.long_text == "{{ extracto }}") {
    return props.data.extracto
  } 
})

const url_foto_tarjeta = computed(() => {
  if(!props.data.foto_tarjeta) return null;
  return `${apiFileURL}/${props.data.foto_tarjeta.filename_disk}`;
});



const possibleSizes = [
  'col-span',
  'col-span-2',
  'col-span-3',
  'col-span-4',
  'col-span-5',
  'col-span-6',
  'col-span-7',
  'col-span-8',
  'col-span-9',
  'col-span-10',
  'col-span-11',
  'col-span-12',
  'lg:col-span',
  'lg:col-span-2',
  'lg:col-span-3',
  'lg:col-span-4',
  'lg:col-span-5',
  'lg:col-span-6',
  'lg:col-span-7',
  'lg:col-span-8',
  'lg:col-span-9',
  'lg:col-span-10',
  'lg:col-span-11',
  'lg:col-span-12'
]

const possibleFontSizes = [
  'text-xs',
  'text-sm',
  'text-base',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl',
  'text-4xl',
  'text-5xl',
  'text-6xl',
  'text-7xl',
  'text-8xl',
  'text-9xl',
  'lg:text-xs',
  'lg:text-sm',
  'lg:text-base',
  'lg:text-lg',
  'lg:text-xl',
  'lg:text-2xl',
  'lg:text-3xl',
  'lg:text-4xl',
  'lg:text-5xl',
  'lg:text-6xl',
  'lg:text-7xl',
  'lg:text-8xl',
  'lg:text-9xl'
]
</script>

<style>

</style>