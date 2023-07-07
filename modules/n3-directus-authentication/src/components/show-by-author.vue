<template>
  <show-logged-in>
    <slot v-if="res"></slot>
    <pre v-if="debug">{{ debug_obj }}</pre>
  </show-logged-in>
</template>
<script setup>

  const props = defineProps({
    collection: {
      type: String,
      default: null,
    },
    author_key: {
      type: String,
      default: 'user_created',
    },
    id_key: {
      type: String,
      default: 'id',
    },
    id: {
      type: [String,Number],
      default: null,
    },
    user_id: {
      type: String,
      default: null,
    },
    debug: {
      type: Boolean,
      default: false
    }
  })

  const {directus_is_author} = permissionsApi()

  const res = await directus_is_author({
    collection: props.collection,
    author_key: props.author_key,
    id_key: props.id_key,
    id: props.id,
    user_id: props.user_id,
  })

  const debug_obj = {
    props: props,
    res: res,
  }
</script>