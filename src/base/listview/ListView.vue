<template>
  <scroll
    class="list-view"
    ref="listview"
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="scroll"
  >
    <!-- 数据表 -->
    <div>
      <div v-for="(group,index) of singers" :key="index" class="list-group" ref="list_group">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item of group.item" :key="item.id" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 字母表 -->
    <div class="shortcut-list">
      <ul ref="shortcut">
        <li
          v-for="(item,index) of shortcutList"
          :key="index"
          :data-index="index"
          class="item"
          :class="{'current':currentIndex===index}"
          @touchstart.stop.prevent="handleTouchStart"
          @touchmove.stop.prevent="handleTouchMove"
        >{{item}}</li>
      </ul>
    </div>
    <!-- 固定标题 -->
    <div class="fixed-list" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <!-- loading -->
    <div class="loading-container" v-show="!singers.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import Scroll from "base/scroll/Scroll";
import Loading from "base/loading/Loading";
const SHORTCUT_HEIGHT = 18;
const TITLE_HEIGHT = 30;
export default {
  created() {
    this.touch = {}; //共享touch事件距离顶部窗口的距离
    this.listenScroll = true; //传递给scroll组件，是否监听scroll事件
    this.probeType = 3; //传递给scroll组件，是否时时刻刻执行scroll事件
  },
  data() {
    return {
      scrollY: -1, //接收scroll组件返回的Y轴坐标值
      currentIndex: 0, //左右联动的全局索引
      diff: -1 //每个group距离顶部的距离
    };
  },
  props: {
    singers: { //歌手数据
      type: Array,
      default: []
    }
  },
  computed: {
    shortcutList() { //字母表处理
      return this.singers.map(item => {
        return item.title.substr(0, 1);
      });
    },
    fixedTitle() { //固定标题处理
      if (this.scrollY > 0) return false;

      if (this.singers[this.currentIndex]) {
        return this.singers[this.currentIndex].title;
      } else {
        return false;
      }
    }
  },
  methods: {
    handleTouchStart(e) {
      //触摸点字母索引
      let anchorIndex = Math.ceil(e.target.getAttribute("data-index"));
      //把索引保存到公共对象中
      this.touch.anchorIndex = anchorIndex;
      //触摸点到窗口顶部的距离
      this.touch.y1 = e.touches[0].pageY;
      this._scrollTo(anchorIndex);
    },
    handleTouchMove(e) {
      //滚动点到窗口顶部的距离
      this.touch.y2 = e.touches[0].pageY;
      //两值相减求差值，再除去字母高度，求得超出的字母索引
      let exceed = Math.ceil((this.touch.y2 - this.touch.y1) / SHORTCUT_HEIGHT);
      //累加到公共对象中
      let anchorIndex = this.touch.anchorIndex + exceed;
      if (anchorIndex >= 0 && anchorIndex < this.shortcutList.length) {
        this._scrollTo(anchorIndex);
      }
    },
    scroll(pos) {
      this.scrollY = pos.y; //执行scroll组件派发的事件，并接收传过来的数据
    },
    _scrollTo(index) {
      this.$refs.listview.scrollToElement(this.$refs.list_group[index]); //Better-Scroll切换
    },
    _groupHeight() {
      this.groupHeight = []; //装载所有group的高度, 含滚动距离
      let height = 0; //第一个group高度为0
      this.groupHeight.push(height);
      const groupList = this.$refs.list_group; //所有group
      groupList.forEach(e => {
        height += e.clientHeight; //每一次获取group高度, 都要累加之前所有group高度
        this.groupHeight.push(height);
      });
    }
  },
  watch: {
    singers() {
      setTimeout(() => {
        this._groupHeight(); //当数据变化, 获取group高度
      }, 20);
    },
    scrollY(newY) {
      //向上滚动, newY大于0
      if (newY > 0) {
        this.currentIndex = 0;
        return;
      }
      //在中间滚动（注意：this.groupHeight高度数组比groupList元素数组多一, 所以遍历时要减1）
      for (let i = 0; i < this.groupHeight.length - 1; i++) {
        let currentHeight = this.groupHeight[i]; //当前的group
        let nextHeight = this.groupHeight[i + 1]; //下一个group
        if ((-newY >= currentHeight && -newY < nextHeight) || !nextHeight) {
          //当y轴处于当前group之内, 设置全局索引为当前索引 (注意：y轴向下是负值, 加负号取正)
          this.currentIndex = i;
          this.diff = nextHeight + newY;
          return;
        }
      }
      //滚动到底部, newY已超出最后一个元素的高度, 直接设置全局索引等于最后一个索引
      this.currentIndex = this.groupHeight.length - 2;
    },
    diff(newVal) {
      let fixedTop = 0;
      if (newVal < TITLE_HEIGHT) { //如果group的距离小于标题高度，则求得偏移值
        fixedTop = newVal - TITLE_HEIGHT;
      } else {
        fixedTop = 0;
      }
      //设置样式滑动偏移
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
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
.list-view
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background
.list-group
  padding-bottom: 30px
.list-group-title
  height: 30px
  line-height: 30px
  padding-left: 20px
  font-size: $font-size-small
  color: $color-text-l
  background: $color-highlight-background
.list-group-item
  display: flex
  align-items: center
  padding: 20px 0 0 30px
.avatar
  width: 50px
  height: 50px
  border-radius: 50%
.name
  margin-left: 20px
  color: $color-text-l
  font-size: $font-size-medium
.shortcut-list
  position: absolute
  z-index: 30
  right: 0
  top: 50%
  transform: translateY(-50%)
  width: 20px
  padding: 20px 0
  border-radius: 10px
  text-align: center
  background: $color-background-d
  font-family: Helvetica
.item
  padding: 3px
  line-height: 1
  color: $color-text-l
  font-size: $font-size-small
&.current
  color: $color-theme
.fixed-list
  position: absolute
  top: 0
  left: 0
  width: 100%
.fixed-title
  height: 30px
  line-height: 30px
  padding-left: 20px
  font-size: $font-size-small
  color: $color-text-l
  background: $color-highlight-background
.loading-container
  position: absolute
  width: 100%
  top: 50%
  transform: translateY(-50%)
</style>
