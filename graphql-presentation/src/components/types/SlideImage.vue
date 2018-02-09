<template>
  <div class="image-container">
    <img :src="imageUrl" alt="Slide Image">
  </div>
</template>

<script>
  export default {
    name: 'slide-image',
    props: {
      imageUrl: String
    }
  }
</script>

<style scoped lang="scss">
  .image-container {
    width: 100%;
    text-align: center;
    img {
      max-width: 100%;
    }
  }
</style>
