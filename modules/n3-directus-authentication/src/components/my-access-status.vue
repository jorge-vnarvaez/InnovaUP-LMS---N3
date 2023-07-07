<template>
    <show-logged-in>
          {{test}}
          <slot>

          </slot>
        
    </show-logged-in>
</template>
<script setup>
    const {directus_my_access} = permissionsApi()
    const test = await directus_my_access({})
</script>