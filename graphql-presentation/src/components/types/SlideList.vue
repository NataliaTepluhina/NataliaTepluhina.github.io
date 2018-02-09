<template>
  <div class="list-container">
    <ul v-for="(item, index) in items" :key="index">
      <li>{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'slide-list',
    props: {
      items: Array
    }
  }
</script>

<style scoped lang="scss">
  ul {
    li {
      font-size: 48px;
      padding-top: 60px;
    }
  }
</style>
