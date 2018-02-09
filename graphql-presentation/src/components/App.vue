<template>
  <main class="slide-container">
    <div class="blurred"></div>
    <transition :name="isDirectionForward ? 'slide-fade' : 'slide-fade-reverse'" mode="out-in">
      <router-view :key="$route.params.id"></router-view>
    </transition>
  </main>
</template>

<script>
  import { eventBus } from '../main'
  export default {
    name: 'app',
    data() {
      return {
        isDirectionForward: true,
      }
    },
    created() {
      eventBus.$on('prevSlide', () => {
        this.isDirectionForward = false;
      });
      eventBus.$on('nextSlide', () => {
        this.isDirectionForward = true;
      })
    }
  }
</script>

<style lang="scss">
  body {
    margin: 0;
  }

  .slide-container {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100vh;
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

  .slide-fade-enter-active, .slide-fade-leave-active, .slide-fade-reverse-enter-active, .slide-fade-reverse-leave-active {
    transition: all .6s ease;
  }
  .slide-fade-enter, .slide-fade-reverse-leave-to
  {
    transform: translateX(100px);
    opacity: 0;
  }

  .slide-fade-leave-to, .slide-fade-reverse-enter {
    transform: translateX(-100px);
    opacity: 0;
  }

</style>
