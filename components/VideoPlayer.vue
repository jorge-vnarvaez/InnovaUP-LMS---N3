<template>
    <div>
        <q-video
        v-if="!img"
        :ratio="ratio"
        :src="embed_id"
        />  

        <q-img v-if="img" :src="embed_id"></q-img>
    </div>
</template>
<script setup>

import { useNuxtApp } from '#app'
import { computed } from 'vue';

const { getApiUrl } = authApi()
const apiUrl        = await getApiUrl();

const props = defineProps({
    src: String,
    ratio: {
        type: Number,
        default: 1 
    },
    pdf: {
        type: Boolean,
        default: false
    },
    img:{
        type: Boolean,
        default: false
    },
    data: {
        type: Object,
        default: () => ({})
    },
    remote: {
        type: Boolean,
        default: false
    }
});


const embed_id = computed(() => {
    const { $urlParser } = useNuxtApp()
    const inputUrl = props.src;

    if(!props.pdf && !props.img) {
        const resUrl = $urlParser.parse(inputUrl)
        console.log('resUrl', resUrl)

        if(resUrl.provider == 'youtube') return `https://www.youtube.com/embed/${$urlParser.parse(inputUrl).id}`
        if(resUrl.provider == 'vimeo') return `https://player.vimeo.com/video/${$urlParser.parse(inputUrl).id}`
    }

    if(props.pdf || props.img){

        if(props.remote) return props.src;
        
        if(!props.data?.filename_disk) return null;
        return `${apiUrl}/assets/${props.data.filename_disk}`;
    }
})
</script>
<style lang="">
    
</style>
