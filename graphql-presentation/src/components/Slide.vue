<template>
  <div class="slide-container">
    <section class="slide-content-overlay">
      <h1 class="slide-title" :class="{main: !currentSlide.contentType}">{{currentSlide.title}}</h1>
      <div class="slide-content" v-if="currentSlide.contentType">
        <div v-if="currentSlide.contentType === 'image'">
          <slide-image :imageUrl="currentSlide.url"></slide-image>
        </div>
        <div v-else-if="currentSlide.contentType === 'list'">
          <slide-list :items="currentSlide.items"></slide-list>
        </div>
        <div v-else-if="currentSlide.contentType === 'iframe'">
          <slide-iframe :iframeUrl="currentSlide.url"></slide-iframe>
        </div>
        <div v-else-if="currentSlide.contentType === 'code'">
          <slide-code :codeSnippets="currentSlide.snippets"></slide-code>
        </div>
        <div v-else-if="currentSlide.contentType === 'complex'">
          <slide-custom></slide-custom>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {slidesData} from '../data/content'
  import SlideImage from './types/SlideImage'
  import SlideList from './types/SlideList'
  import SlideIframe from './types/SlideIframe'
  import SlideCode from './types/SlideCode'
  import SlideCustom from './types/SlideCustom'

  export default {
    name: 'slide',
    components: {
      SlideImage,
      SlideList,
      SlideIframe,
      SlideCustom,
      SlideCode
    },
    data() {
      return {
        slidesData,
      }
    },
    computed: {
      currentSlide() {
        return this.slidesData.find(slide => slidesData.indexOf(slide) === parseInt(this.$route.params.id))
      }
    }
  }
</script>

<style scoped lang="scss">
  h1 {
    margin: 0;
  }

  .slide-container {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    background-size: cover;
    color: #edbfff;
    font-family: 'Titillium Web', sans-serif;
    box-sizing: border-box;
    background: none;
    .slide-content-overlay {
      position: relative;
      width: 100%;
      max-width: 1420px;
      z-index: 2;
      .slide-title {
        font-size: 56px;
        border-bottom: 3px solid #edbfff;
        &.main {
          border: none;
          text-align: center;
          font-size: 96px;
        }
      }
      .slide-content {
        padding-top: 40px;
        width: 100%;
        min-height: 550px;
      }
    }
  }
</style>
