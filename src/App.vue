<template>
  <div id="app">
    <m-header></m-header>
    <m-nav></m-nav>
    <keep-alive>
      <transition name="slide">
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </transition>
    </keep-alive>
    <transition name="slide">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <Player></Player>
  </div>
</template>

<script>
import MHeader from "@/components/Header/Header";
import MNav from "@/components/Nav/Nav";
import Player from "@/components/Player/Player";
export default {
  name: "App",
  components: {
    MHeader,
    MNav,
    Player
  }
};
</script>

<style lang="stylus" scoped>
.slide-enter, .slide-leave-to
  opacity: 0
.slide-enter-active, .slide-leave-active
  transition: all 0.5s
</style>

