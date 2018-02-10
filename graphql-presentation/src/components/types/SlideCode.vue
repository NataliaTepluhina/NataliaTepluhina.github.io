<template>
  <div class="code-container">
    <div class="code" v-for="(snippet, index) in codeSnippets" :key="index">
      <pre v-html="snippet"></pre>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'slide-code',
    props: {
      codeSnippets: Array
    }
  }
</script>

<style scoped lang="scss">
  .code-container {
    width: 100%;
    .code {
      margin-bottom: 30px;
      padding: 10px 20px;
      background-color: rgba(255,255,255, .8);
      font-family: 'Inconsolata', monospace;
      color: #333;
      font-size: 16px;
      /deep/ .keyword {
        color: #e96900;
      }
      /deep/ .string {
        color: #22a699;
      }
      /deep/ .function, /deep/ .built_in {
        color: #c7254e;
      }
      /deep/ .comment {
        color: #999;
      }
      /deep/ .regexp {
        color: #90a959;
      }
    }
  }
</style>
