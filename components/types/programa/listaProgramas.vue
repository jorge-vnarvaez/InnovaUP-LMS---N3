<template>
    <div>
        <div v-if="loading">Cargando...</div>
        <div v-else class="font-sans">
            <h1 class="text-3xl font-bold text-gray-900 mb-5">Programas</h1>
            <scrollable v-if="programas && programas.length > 0" :n="programas.length" 
            gap="15px" class="py-5"
            el-min-height="300px" el-min-width="350px" el-max-width="350px" snap min-height="400px" width="100%" max-width="100%" x-scroll>
                <types-programa-card-programa
                v-for="(programa, index) in programas" :key="index"
                :nombre="programa.nombre"
                :descripcion="programa.descripcion" :id="programa.id"
                :extracto="programa.extracto" :foto_tarjeta="programa.generar_foto_con_ia ? programa.foto_tarjeta_ia : programa.foto_tarjeta"></types-programa-card-programa>
            </scrollable>

            <h3 v-else>Por el momento no tienes asignado programas.</h3>

            
           
          <!-- <pre>{{ programas }}</pre> -->
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { programas } from '~/composables/programas/state'
import { getProgramas } from '~/composables/programas/actions'

const loading = ref(true)

onMounted(async () => {
    await getProgramas()
    loading.value = false
})

</script>
