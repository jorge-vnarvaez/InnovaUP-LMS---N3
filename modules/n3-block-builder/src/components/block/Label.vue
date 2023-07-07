<template>
    <span class="text-lg lg:text-3xl font-gotham font-bold">{{ block.title }}</span>
</template>

<script>
export default {
    props: {
        block: {
            type: Object,
            required: true,
        },
    }
}
</script>

<style>

</style>