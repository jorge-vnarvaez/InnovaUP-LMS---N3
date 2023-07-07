<template>
  <div>
     <v-card :to="block.href" outlined rounded="xl" class="py-4 lg:mr-10 cursor-pointer px-12" 
     :style="{
      backgroundColor: block.hover_color,
      color: 'white'
     }">
        <v-container class="max-w-screen-xl mx-auto">
          <v-row>
            <BlockComponent
              v-for="child in block.childs"
              :key="child.id"
              :block="child"
            >
            </BlockComponent>
          </v-row>
        </v-container>
     </v-card>
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