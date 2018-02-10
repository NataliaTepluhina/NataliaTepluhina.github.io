<template>
  <div class="complex-container">
    <div class="column">
      <p>Basic example:</p>
      <img src="https://i.imgur.com/Sye8xHi.png" alt="">
      <p>With a relationship between types:</p>
      <img src="https://i.imgur.com/6hZ8GjI.png" alt="">
    </div>
    <div class="column">
      <p>Scalar types</p>
      <ul>
        <li>Int</li>
        <li>Float</li>
        <li>String</li>
        <li>Boolean</li>
        <li>ID</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'slide-custom',
    props: {
      currentSlide: Object,
    }
  }
</script>

<style scoped lang="scss">
  .complex-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .column {
      width: 50%;
      font-size: 28px;
      img {
        width: 410px;
        max-width: 100%;
      }
    }
  }
</style>
