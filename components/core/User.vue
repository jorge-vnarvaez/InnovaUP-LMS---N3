<template>
    <div v-if="data.directus_users_id" class="bg-white md:flex p-5 md:p-0 no-wrap border" bordered flat>
        
            <q-avatar size="130px" square>
                <q-img v-if="data.directus_users_id?.avatar?.filename_disk" :src="`${url_foto_tarjeta}`"></q-img>
            </q-avatar>
            <div class="md:p-5 font-sans">
                <div class="font-sans font-bold text-lg">{{ `${data.directus_users_id.first_name} ${data.directus_users_id.last_name}` }}</div>
                <div class="font-body text-lg" v-if="data.directus_users_id.description">{{ `${data.directus_users_id?.description}` }}</div>
            </div>
    </div>
</template>

<script setup>

import {computed} from 'vue';

const { getApiUrl } = authApi()
const apiUrl        = await getApiUrl();

const props = defineProps({
    foto: Object,
    height: {
        type: [String, Number],
        default: '250px'
    },
    data: {
        type: Object,
        default: () => ({})
    }
});

const url_foto_tarjeta = computed(() => {
    if(!props.data?.directus_users_id?.avatar?.filename_disk) return null;
    return `${apiUrl}/assets/${props.data.directus_users_id.avatar.filename_disk}`;
});

</script>
