<template>
     <div class="grid grid-cols-12 col-span-12 gap-y-12 lg:gap-y-0">
        <div
            v-for="feature in block.features_list"
              :key="feature.id"
              class="col-span-12 lg:col-span-4 flex flex-col align-center"
            >
                <div>
                    <v-img v-if="feature.icon_image" :src="$config.apiUrlV2 + '/assets/' + feature.icon_image" height="105" width="85" contain></v-img>
                </div>
                <span class="block text-2xl lg:h-16 w-full lg:w-8/12 font-medium text-slate-700 mt-2 lg:mt-0 text-center text-lg-start">{{feature.title}}</span>
                <span class="block w-8/12 text-slate-600 text-center text-lg-start mt-4 mt-xl-4" v-html="feature.description"></span>
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
    }
}
</script>

<style>

</style>