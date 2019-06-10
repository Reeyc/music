<!--推荐页-->
<template>
  <div class="fixed">
    <!-- wrapper -->
    <scroll :data="recommendList" class="wrapper" ref="scroll">
      <!-- slot -->
      <div>
        <!-- 轮播图 -->
        <swiper :options="swiperOptions" v-if="slideLength" class="slide-wrapper">
          <swiper-slide v-for="item in slideList" :key="item.id" class="slide-list">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" @load="imgLoad" class="slide-img">
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <!-- 热门推荐 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item of recommendList" :key="item.dissid" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" class="icon-img">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
        <!-- loading -->
        <loading class="loading-container" v-show="!recommendList.length"></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "base/scroll/Scroll";
import Loading from "base/loading/Loading";
import { getSlide, getDiscList } from "api/recommend";
import { ERR_OK } from "api/config";
export default {
  data() {
    return {
      slideList: [],
      recommendList: [],
      swiperOptions: {
        pagination: ".swiper-pagination", //页码圆点类名
        autoplay: 3000, //播放且每页停留3秒
        autoplayDisableOnInteraction: false, //触摸后不停止
        speed: 500, //播放速度
        loop: true, //循环播放
        observer: true, //修改swiper子元素时自动初始化swiper
        observeParents: true //修改swiper父元素时自动初始化swiper
      }
    };
  },
  created() {
    this._getSlide();
    this._getDiscList();
  },
  methods: {
    _getSlide() {
      getSlide().then(res => {
        if (res.code === ERR_OK) {
          this.slideList = res.data.slider;
        }
      });
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.recommendList = res.data.list;
        }
      });
    },
    imgLoad() {
      if (!this.flag) {
        //异步请求的图片加载完毕后，better-scroll重新计算高度
        //当然如果图片的元素已有高度，则不用等图片加载完毕
        this.$refs.scroll.refresh();
        this.flag = true;
      }
    }
  },
  computed: {
    slideLength() {
      return this.slideList.length;
    }
  },
  components: {
    Scroll,
    Loading
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.slide-wrapper >>> .swiper-pagination-bullet-active
  background-color: #fff
.fixed
  position: fixed
  bottom: 0 /* fixed+top:0+bottom:0 设置元素高度为当前页面可视区域高度，配合Better-Scroll，超出高度滚动 */
  top: 88px
  width: 100%
.wrapper
  height: 100%
  overflow: hidden
.slide-wrapper
  position: relative
  width: 100%
  overflow: hidden
.slide-list
  height: 0
  padding-bottom: 40%
  overflow: hidden
  background-color: #ccc
.slide-img
  width: 100%
.recommend-list, .list-title
  line-height: 65px
  text-align: center
  font-size: $font-size-medium
  color: $color-theme
.item
  display: flex
  box-sizing: border-box
  align-items: center
  padding: 0 20px 20px 20px
.icon
  width: 60px
  padding-right: 20px
.icon-img
  display: block
  width: 100%
.text
  flex: 1
  min-width: 0 /* 脱标的元素设置min-width子元素才能溢出显示省略号 */
  line-height: 20px
  text-align: left
  font-size: $font-size-medium
.name
  margin-bottom: 10px
  color: $color-text
  no-wrap()
.desc
  color: $color-text-d
  no-wrap()
.loading-container
  margin-top: 50px
</style>
