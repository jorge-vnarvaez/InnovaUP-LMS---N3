<template>
    <div v-show="is_user_logged_in">
      <slot></slot>
    </div>
</template>
<script setup>
    const {is_user_logged_in} = userStore()
</script>