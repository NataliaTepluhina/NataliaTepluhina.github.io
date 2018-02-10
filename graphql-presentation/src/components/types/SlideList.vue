<template>
  <div class="list-container">
    <ul v-for="(item, index) in items" :key="index">
      <li v-html="item">{{item}}</li>
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
    margin-left: 40px;
    li {
      font-size: 36px;
      padding-bottom: 10px;
      /deep/ a {
        color: #c104cd
      }
    }
  }
</style>
