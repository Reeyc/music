<!--歌曲列表包裹组件-->
<template>
  <div class="music-list">
    <!-- 返回按钮 -->
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <!-- 标题 -->
    <h1 class="title">{{singerTitle}}</h1>
    <!-- 背景图 -->
    <div class="bg-img" ref="bgImg" :style="bgStyle">
      <div class="play-wrapper">
        <div class="play" ref="playBtn" v-show="songs.length>0">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <!-- 滚动层 -->
    <!-- 说明：歌单滚动区往上滚动会超出区域, 而滚动层高度固定100%, 背景颜色跟滚动区一致, top值随着滚动而变化, 这样就造成了滚动区高度超出的假象, 实际上展示的是随着滚动区滚动而变化的滚动层 -->
    <div class="bg-layer" ref="layer"></div>
    <!-- 歌单滚动区 -->
    <scroll
      :data="songs"
      :probeType="probeType"
      :listenScroll="listenScroll"
      @scroll="scroll"
      class="list"
      ref="list"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
    </scroll>
    <!-- loading -->
    <div class="loading-container" v-show="!songs.length">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Scroll from "base/scroll/Scroll";
import SongList from "base/songlist/Song-list";
import Loading from "base/loading/Loading";
import { mapActions } from "vuex";
const TITLE_HEIGHT = 40;
export default {
  props: {
    songs: {
      type: Array,
      default: []
    },
    singerTitle: {
      type: String,
      default: ""
    },
    singerImg: {
      type: String,
      default: ""
    }
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;
  },
  mounted() {
    //设置歌单滚动区域的定位top值为图片高度
    //注意：ref属性绑定给组件标签, this.$refs.xxx指向的是组件对象
    this.bgImgHeight = this.$refs.bgImg.clientHeight;
    this.$refs.list.$el.style.top = `${this.bgImgHeight}px`;
  },
  data() {
    return {
      scrollY: 0
    };
  },
  computed: {
    bgStyle() {
      return `background-image: url(${this.singerImg})`;
    }
  },
  methods: {
    ...mapActions(["selectPlay"]),
    back() {
      this.$router.back();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    //vuex.actions批量修改mutation
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      });
    }
  },
  watch: {
    scrollY(newY) {
      //限制滚动的top值, 最多滚动到图片的高度, 否则滚动newY值
      let translateY = Math.max(newY, -this.bgImgHeight);
      this.$refs.layer.style.transform = `translate3d(0, ${translateY}px, 0)`;
      this.$refs.layer.style.webkitTransform = `translate3d(0, ${translateY}px, 0)`;
      let zIndex = 0;
      //往下拉
      if (newY > 0) {
        //求出放大的比例: 下拉的值除以图片高度, 拉得越多得越大
        const datio = 1 + Math.abs(newY / this.bgImgHeight);
        this.$refs.bgImg.style.transform = `scale(${datio})`;
        zIndex = 10;
      }
      //往上滚, 当滚动到标题处时, 也就是滚动到(图片-标题)的高度
      if (newY < -this.bgImgHeight + TITLE_HEIGHT) {
        //动态改变图片的高度 (图片的高度是用宽高比占位的), 并设置z-index高于scroll
        this.$refs.bgImg.style.paddingTop = 0;
        this.$refs.bgImg.style.height = `${TITLE_HEIGHT}px`;
        this.$refs.playBtn.style.display = "none";
        zIndex = 10;
      } else {
        //没滚到标题处, 恢复原样
        this.$refs.bgImg.style.paddingTop = "70%";
        this.$refs.bgImg.style.height = 0;
        this.$refs.playBtn.style.display = "block";
      }
      this.$refs.bgImg.style.zIndex = zIndex;
    }
  },
  components: {
    Scroll,
    SongList,
    Loading
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.music-list
  // 占满屏幕
  position: fixed
  z-index: 100
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: $color-background
.back
  position: absolute
  top: 0
  left: 6px
  z-index: 50
.icon-back
  display: block
  padding: 10px
  font-size: $font-size-large-x
  color: $color-theme
.title
  position: absolute
  top: 0
  left: 10%
  z-index: 40
  width: 80%
  no-wrap()
  text-align: center
  line-height: 40px
  font-size: $font-size-large
  color: $color-text
.bg-img
  position: relative
  width: 100%
  height: 0
  padding-top: 70%
  background-size: cover
  transform-origin: top // 图片放大的角度是从上放大
.play-wrapper
  position: absolute
  bottom: 20px
  z-index: 50
  width: 100%
.play
  box-sizing: border-box
  width: 135px
  padding: 7px 0
  margin: 0 auto
  text-align: center
  border: 1px solid $color-theme
  color: $color-theme
  border-radius: 100px
  font-size: 0
.icon-play
  display: inline-block
  vertical-align: middle
  margin-right: 6px
  font-size: $font-size-medium-x
.text
  display: inline-block
  vertical-align: middle
  font-size: $font-size-small
.filter
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(7, 17, 27, 0.4)
.bg-layer
  height: 100%
  background: $color-background
.list
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  background: $color-background
.song-list-wrapper
  padding: 20px 30px
.loading-container
  position: absolute
  width: 100%
  top: 60%
  transform: translateY(-50%)
</style>
