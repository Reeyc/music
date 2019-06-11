<template>
  <div class="player" v-show="playlist.length">
    <div class="normal-player" v-show="fullScreen">播放器</div>
    <div class="mini-player" v-show="!fullScreen"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["playlist", "fullScreen"])
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.player .normal-player
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  z-index: 150
  background: $color-background
.mini-player
  display: flex
  align-items: center
  position: fixed
  left: 0
  bottom: 0
  z-index: 180
  width: 100%
  height: 60px
  background: $color-highlight-background
</style>
