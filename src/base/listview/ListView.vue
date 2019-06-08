<template>
  <scroll class="list-view" ref="listview">
    <!--scroll包裹层-->
    <ul>
      <!--scroll内容层-->
      <li v-for="(group,index) of data" :key="index" class="list-group" ref="list_group">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item of group.item" :key="item.id" class="list-group-item">
            <img :src="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="shortcut-list">
      <ul>
        <li
          v-for="(item,index) of shortcutList"
          :key="index"
          :data-index="index"
          class="item"
          @touchstart="handleTouchStart"
        >{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from "base/scroll/Scroll";
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    shortcutList() {
      return this.data.map(item => {
        return item.title.substr(0, 1);
      });
    }
  },
  methods: {
    handleTouchStart(e) {
      const index = e.target.getAttribute("data-index"); //字母表索引
      const element = this.$refs.list_group[index]; //字母表索引对应数据表的数据
      this.$refs.listview.scroll.scrollToElement(element); //Better-Scroll切换
    }
  },
  components: {
    Scroll
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
</style>
