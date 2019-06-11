<!--通用歌曲列表组件-->
<template>
  <div class="song-list">
    <ul>
      <li v-for="(item,index) of songs" :key="item.mid" class="item" @click="select(item,index)">
        <div class="content">
          <h2 class="name">{{item.name}}</h2>
          <p class="desc">{{getDesc(item)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  methods: {
    getDesc(song) {
      return `${song.singer} · ${song.albumname}`;
    },
    select(item, index) {
      this.$emit("select", item, index); //把歌曲信息传递出去
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.song-list .item
  display: flex
  align-items: center
  box-sizing: border-box
  height: 64px
  font-size: $font-size-medium
.content
  flex: 1
  line-height: 20px
  overflow: hidden
.name
  no-wrap()
  color: $color-text
.desc
  no-wrap()
  margin-top: 4px
  color: $color-text-d
</style>
