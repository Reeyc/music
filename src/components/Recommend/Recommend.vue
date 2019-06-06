<!--推荐-->
<template>
  <div>
    <swiper :options="swiperOptions" v-if="slideLength" class="wrapper">
      <swiper-slide v-for="item in slideList" :key="item.id" class="slide-list">
        <img :src="item.picUrl" class="slide-img">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="recommend-list">
      <h1 class="list-title">热门歌单推荐</h1>
      <ul>
        <li v-for="item of recommendList" :key="item.dissid" class="item">
          <div class="icon">
            <img :src="item.imgurl" class="icon-img">
          </div>
          <div class="text">
            <h2 class="name" v-html="item.creator.name"></h2>
            <p class="desc" v-html="item.dissname"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
    }
  },
  computed: {
    slideLength() {
      return this.slideList.length;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.wrapper >>> .swiper-pagination-bullet-active
  background-color: #fff
.slider-wrapper
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
  height: 65px
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
  line-height: 20px
  text-align: left
  font-size: $font-size-medium
.name
  margin-bottom: 10px
  color: $color-text
.desc
  color: $color-text-d
</style>
