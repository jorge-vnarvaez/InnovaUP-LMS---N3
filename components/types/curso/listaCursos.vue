<template>
    <div>
        <scrollable v-if="cursos" :n="cursos.length" 
        gap="15px" class="py-5"
        el-min-height="300px" el-min-width="350px" snap min-height="400px" width="100%" x-scroll>
            <types-curso-card-curso 
            v-for="(curso, index) in cursos" :key="index"
            :id="curso.id"
            :nombre="curso.nombre"
            :descripcion="curso.descripcion"
            :extracto="curso.extracto"
            :foto_tarjeta="curso.generar_foto_con_ia ? curso.foto_tarjeta_ia : curso.foto_tarjeta"
            ></types-curso-card-curso>
        </scrollable>
        <!-- <pre>{{ cursos }}</pre> -->
    </div>
</template>
<script setup>
import { cursos } from '~/composables/cursos/state'
import { getCursos } from '~/composables/cursos/actions'
const loading = ref(true)

onMounted(async () => {
    await getCursos()
    loading.value = false
})
</script>