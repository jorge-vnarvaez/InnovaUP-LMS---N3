<template>
  <div ref="imageElement">
    <v-img
      :src="$config.apiUrlV2 + '/assets/' + image"
      max-width="100%"
      height="100%"
      contain
    ></v-img>
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
  computed: {
    image() {
      return typeof(this.block.image) == 'string' ? this.block.image : this.block.image.id;
    },
  },
  data() {
    return {
      showText: false,
    };
  },
  mounted() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold as needed
    };

    const observer = new IntersectionObserver(this.handleIntersection, options);
    observer.observe(this.$refs.imageElement);
  },
  methods: {
    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.showText = true;
        } else {
          this.showText = false;
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
  animation-duration: 5s;
  animation-composition: ease-in-out;
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
