<template>
  <div class="player" v-show="playlist.length">
    <!-- 全屏播放器 -->
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <!-- 背景图 -->
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <!-- 顶部信息 -->
        <div class="top">
          <!--返回按钮-->
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title">{{currentSong.name}}</h1>
          <h2 class="subtitle">{{currentSong.singer}}</h2>
        </div>
        <!-- 中部信息 -->
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
          </div>
        </div>
        <!-- 底部信息 -->
        <div class="bottom">
          <!-- 控件 -->
          <div class="operators">
            <!-- 播放模式 -->
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <!-- 上一首 -->
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <!-- 播放按钮 -->
            <div class="icon i-center">
              <i class="icon-play"></i>
            </div>
            <!-- 下一首 -->
            <div class="icon i-right">
              <i class="icon-next"></i>
            </div>
            <!-- 喜欢歌曲 -->
            <div class="icon i-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 底部mini播放器 -->
    <transition name="mini">
      <div class="mini-player" @click="open" v-show="!fullScreen">
        <!-- 小图片 -->
        <div class="icon">
          <img width="40" height="40" :src="currentSong.image">
        </div>
        <!-- 歌曲信息 -->
        <div class="text">
          <h2 class="name">{{currentSong.name}}</h2>
          <p class="desc">{{currentSong.singer}}</p>
        </div>
        <!-- 播放按钮 -->
        <div class="control"></div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["playlist", "currentIndex", "fullScreen"]),
    ...mapGetters(["currentSong"])
  },
  methods: {
    ...mapMutations(["SET_FULL_SCREEN"]),
    back() {
      this.SET_FULL_SCREEN(false);
    },
    open() {
      this.SET_FULL_SCREEN(true);
    }
  },
  updated() {
    console.log(this.currentSong);
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.normal-player
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  z-index: 150
  background: $color-background
  /* normal-player动画 */
  &.normal-enter-active, &.normal-leave-active
    transition: all 0.4s
    .top, .bottom
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
  &.normal-enter, &.normal-leave-to
    opacity: 0
    .top
      transform: translate3d(0, -100px, 0)
    .bottom
      transform: translate3d(0, 100px, 0)
/* 背景图 */
.background
  position: absolute
  left: 0
  top: 0
  width: 100%
  height: 100%
  z-index: -1 // 不覆盖标准流
  opacity: 0.6
  filter: blur(20px) // 高斯模糊
/* 顶部区 */
.top
  position: relative
  margin-bottom: 25px
  .back
    position: absolute
    top: 0
    left: 6px
    z-index: 50
    .icon-back
      display: block
      padding: 9px
      font-size: $font-size-large-x
      color: $color-theme
      transform: rotate(-90deg) // 2D旋转
  .title
    width: 70%
    margin: 0 auto
    line-height: 40px
    text-align: center
    no-wrap()
    font-size: $font-size-large
    color: $color-text
  .subtitle
    line-height: 20px
    text-align: center
    font-size: $font-size-medium
    color: $color-text
/* 中部区 */
.middle
  position: fixed
  width: 100%
  top: 80px
  bottom: 170px
  white-space: nowrap
  font-size: 0
  .middle-l
    display: inline-block
    vertical-align: top
    position: relative
    width: 100%
    height: 0
    padding-top: 80%
    .cd-wrapper
      position: absolute
      left: 10%
      top: 0
      width: 80%
      height: 100%
      .cd
        width: 100%
        height: 100%
        box-sizing: border-box
        border: 10px solid rgba(255, 255, 255, 0.1)
        border-radius: 50%
        .image
          position: absolute
          left: 0
          top: 0
          width: 100%
          height: 100%
          border-radius: 50%
/* 底部区 */
.bottom
  position: absolute
  bottom: 50px
  width: 100%
  .operators
    display: flex
    align-items: center
    .icon
      flex: 1
      color: $color-theme
      &.disable
        color: $color-theme-d
      i
        font-size: 30px
    .i-left
      text-align: right
    .i-center
      padding: 0 20px
      text-align: center
      i
        font-size: 40px
    .i-right
      text-align: left
    .icon-favorite
      color: $color-sub-theme
/* 底部播放器 */
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
  &.mini-enter-active, &.mini-leave-active
    /* mini-player动画 */
    transition: all 0.4s
  &.mini-enter, &.mini-leave-to
    opacity: 0
  .icon
    flex: 0 0 40px
    width: 40px
    padding: 0 10px 0 20px
    img
      border-radius: 50%
  .text
    display: flex
    flex-direction: column
    justify-content: center
    flex: 1
    line-height: 20px
    overflow: hidden
    .name
      margin-bottom: 2px
      no-wrap()
      font-size: $font-size-medium
      color: $color-text
    .desc
      no-wrap()
      font-size: $font-size-small
      color: $color-text-d
  .control
    flex: 0 0 30px
    width: 30px
    padding: 0 10px
    .icon-play-mini, .icon-pause-mini, .icon-playlist
      font-size: 30px
      color: $color-theme-d
</style>
