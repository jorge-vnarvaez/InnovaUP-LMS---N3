<template>
    <span v-show="is_user_logged_in">
      <slot></slot>
    </span>
</template>
<script setup>
    const {is_user_logged_in} = userStore()
</script>