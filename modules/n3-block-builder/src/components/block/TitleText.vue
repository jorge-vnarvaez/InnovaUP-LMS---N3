<template>
  <div class="flex flex-col justify-center">
    <span
      v-if="block.text"
      ref="textElement"
      :class="['block py-0 font-gotham', block.align, block.mobile_font_size, block.font_size]"
      :style="{
        color: block.text_color,
      }"
    >
      {{ block.text }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver(this.handleIntersection, options);
    observer.observe(this.$refs.textElement);
  },
  methods: {
    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.show = true;
        } else {
          this.show = false;
        }
      });
    },
  },
};
</script>

<style>
.fade-in {
  opacity: 0;
  animation-name: fadeIn;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>