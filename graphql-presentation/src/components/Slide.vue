<template>
  <div class="slide-container">
    <i class="fas fa-angle-left" :class="{disabled: currentSlide.id === 1}"
       @click="prevSlide($route.params.id)"></i>
    <section class="slide-content-overlay">
      <h1 class="slide-title">{{currentSlide.title}}</h1>
      <div class="slide-content">
        <div v-if="currentSlide.contentType === 'image'">
          <slide-image :imageUrl="currentSlide.url"></slide-image>
        </div>
        <div v-else-if="currentSlide.contentType === 'list'">
          <slide-list :items="currentSlide.items"></slide-list>
        </div>
        <div v-else-if="currentSlide.contentType === 'iframe'">
          <slide-iframe :iframeUrl="currentSlide.url"></slide-iframe>
        </div>
      </div>
    </section>
    <i class="fas fa-angle-right" :class="{disabled: currentSlide.id === slidesData.length}"
       @click="nextSlide($route.params.id)"></i>
  </div>
</template>

<script>
  import { slidesData } from '../data/content'
  import SlideImage from './types/SlideImage'
  import SlideList from './types/SlideList'
  import SlideIframe from './types/SlideIframe'
  import { eventBus } from '../main'
  export default {
    name: 'slide',
    components: {
      SlideImage,
      SlideList,
      SlideIframe
    },
    data() {
      return {
        slidesData,
      }
    },
    computed: {
      currentSlide() {
        return this.slidesData.find(slide => slide.id === parseInt(this.$route.params.id))
      }
    },
    methods: {
      prevSlide(slide) {
        const previousSlide = parseInt(slide) - 1;
        if (previousSlide > 0) {
          this.$router.push({ path: `/slide/${previousSlide}` });
          eventBus.$emit('prevSlide')
        }
      },
      nextSlide(slide) {
        let nextSlide = parseInt(slide) + 1;
        if (nextSlide <= slidesData.length) {
          this.$router.push({ path: `/slide/${nextSlide}` });
          eventBus.$emit('nextSlide')
        }
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
    height: 100vh;
    background-size: cover;
    color: #edbfff;
    font-family: 'Titillium Web', sans-serif;
    box-sizing: border-box;
    background: none;
    .fas {
      z-index: 2;
      font-size: 90px;
      cursor: pointer;
      &.disabled {
        opacity: .5;
        cursor: default;
      }
    }
    .slide-content-overlay {
      position: relative;
      width: 100%;
      max-width: 1420px;
      min-height: 750px;
      z-index: 2;
      .slide-title {
        font-size: 56px;
        border-bottom: 3px solid #edbfff;
      }
      .slide-content {
        padding-top: 40px;
        width: 100%;
      }
    }
  }
</style>
