<template>
    <div v-if="data.directus_files_id" class="flex p-3 no-wrap cursor-pointer border w-full" flat @click="downloadFile">
            <div class="flex column justify-center">
                <div class="border" flat :class="{
                    'p-4 text-uppercase': true
                }" :style="{
                    color: file_type[1],
                }">
                    {{ file_type[0] }}
                </div>
            </div>
            <div class="p-3 text-medium font-sans">
                {{data.directus_files_id.title}}
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

const downloadFile = () => {
    if(!props.data?.directus_files_id?.filename_disk) return null;
    window.open(`${apiUrl}/assets/${props.data.directus_files_id?.filename_disk}`);
}

const file_type = computed(() => {

  const commonFiles = {
    'application/pdf': ['pdf', 'red'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx', 'blue'],
    'application/msword': ['doc', 'blue'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx', 'green'],
    'application/vnd.ms-excel': ['xls', 'green'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['pptx', 'orange'],
    'application/vnd.ms-powerpoint': ['ppt', 'orange'],
    'application/zip': ['zip', 'purple'],
    'application/x-rar-compressed': ['rar', 'purple'],
    'application/x-7z-compressed': ['7z', 'purple'],
    'application/x-tar': ['tar', 'purple'],
    'application/x-gzip': ['gz', 'purple'],
    'application/x-bzip2': ['bz2', 'purple'],
    'application/x-bzip': ['bz', 'purple'],
    'application/x-zip-compressed': ['zip', 'purple'],
    'application/x-compressed': ['zip', 'purple'],
    'application/x-iso9660-image': ['iso', 'purple'],
    'application/x-msdownload': ['exe', 'purple'],
    'application/x-ms-dos-executable': ['exe', 'purple'],
    'application/x-msdos-program': ['exe', 'purple'],
    'application/x-msi': ['exe', 'purple'],
    'application/x-ms-shortcut': ['exe', 'purple'],
    'application/x-msdos-windows': ['exe', 'purple'],
  }

  if(props.data.directus_files_id.type in commonFiles) return commonFiles[props.data.directus_files_id.type]
  else return ['file', 'grey']

})

</script>
