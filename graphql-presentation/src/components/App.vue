<template>
  <main class="slide-container" tabindex="0" @keyup.space="nextSlide()">
    <div class="blurred"></div>
    <i class="fas fa-angle-left" :class="{disabled: slidesData.indexOf(currentSlide) === 0}"
       @click="prevSlide()"></i>
    <transition :name="isDirectionForward ? 'slide-fade' : 'slide-fade-reverse'" mode="out-in">
      <router-view :key="$route.params.id"></router-view>
    </transition>
    <i class="fas fa-angle-right" :class="{disabled: slidesData.indexOf(currentSlide) === (slidesData.length - 1)}"
       @click="nextSlide()"></i>
  </main>
</template>

<script>
  import {slidesData} from '../data/content'

  export default {
    name: 'app',
    data() {
      return {
        isDirectionForward: true,
        slidesData
      }
    },
    methods: {
      prevSlide() {
        const previousSlide = parseInt(this.$route.params.id) - 1;
        if (previousSlide >= 0) {
          this.$router.push({path: `/slide/${previousSlide}`});
          this.isDirectionForward = false;
        }
      },
      nextSlide() {
        let nextSlide = parseInt(this.$route.params.id) + 1;
        if (nextSlide < slidesData.length) {
          this.$router.push({path: `/slide/${nextSlide}`});
          this.isDirectionForward = true;
        }
      }
    },
    computed: {
      currentSlide() {
        return this.slidesData.find(slide => slidesData.indexOf(slide) === parseInt(this.$route.params.id))
      }
    }
  }
</script>

<style lang="scss">
  html, body {
    margin: 0;
    height: 100%;
  }

  .slide-container {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 50px;
    width: 100%;
    height: 100%;
    background-image: url("../assets/graphql-bg.png");
    background-size: cover;
    color: #edbfff;
    font-family: 'Titillium Web', sans-serif;
    box-sizing: border-box;
    overflow: hidden;
    .blurred {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, .8);
    }
  }

  .fas {
    z-index: 2;
    font-size: 90px;
    cursor: pointer;
    &.disabled {
      opacity: .5;
      cursor: default;
    }
  }

  .slide-fade-enter-active, .slide-fade-leave-active, .slide-fade-reverse-enter-active, .slide-fade-reverse-leave-active {
    transition: all .6s ease;
  }

  .slide-fade-enter, .slide-fade-reverse-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }

  .slide-fade-leave-to, .slide-fade-reverse-enter {
    transform: translateX(-100px);
    opacity: 0;
  }

</style>
