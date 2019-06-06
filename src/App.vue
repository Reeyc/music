<template>
  <div id="app">
    <m-header></m-header>
    <m-nav></m-nav>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import MHeader from "@/components/Header/Header";
import MNav from "@/components/Nav/Nav";
export default {
  name: "App",
  components: {
    MHeader,
    MNav
  }
};
</script>

<style lang="stylus" scoped></style>

