<template>
  <span>
    <span v-if="is_user_logged_in && !is_roles">
      <slot>
      </slot>
    </span>
    <span v-if="is_user_logged_in && is_roles">
      <slot name="false"></slot>
    </span>
    <pre v-if="debug">{{debugObj}}</pre>
  </span>
</template>
<script setup>

  import {ref, reactive, onMounted, onUpdated, watch} from 'vue'

  const props = defineProps({
      roles: {
          type: Array,
          required: true
      },
      debug: {
          type: Boolean,
          default: false
      }
  })

  const is_roles  = ref(false)
  const loading   = ref(true)
  const debugObj  = reactive({})

  const {is_user_logged_in} = userStore()
  const {directus_is_role, directus_my_roles}  = permissionsApi()

  const updateRolesData = async() => {
    is_roles.value = false
    debugObj.value = {}
    debugObj.roles    = props.roles


    if(is_user_logged_in.value && props.roles.length !== 0) {
      debugObj.is_roles = await directus_is_role({
        role: props.roles
      })
      is_roles.value    = debugObj.is_roles

    }
    if(props.debug){
      debugObj.my_roles = await directus_my_roles({})
    }  
  }

  // watch is_user_logged_in.value, async (newValue, oldValue) => {

  watch(is_user_logged_in, async (newValue, oldValue) => {
    await updateRolesData()
  })

  onMounted(async () => {

      await updateRolesData()
      loading.value = false

  })
</script>