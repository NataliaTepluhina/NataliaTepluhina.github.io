<template>
  <div class="image-container">
    <iframe :src="iframeUrl" scrolling="no"></iframe>
  </div>
</template>

<script>
  export default {
    name: 'slide-iframe',
    props: {
      iframeUrl: String
    }
  }
</script>

<style scoped lang="scss">
  .image-container {
    width: 100%;
    iframe {
      height: 600px;
      width: 100%;
    }
  }
</style>
