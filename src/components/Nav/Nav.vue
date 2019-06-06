<!--公共导航栏-->
<template>
  <div class="nav">
    <router-link to="/recommend" tag="div" class="nav-item">
      <span class="nav-link">推荐</span>
    </router-link>
    <router-link to="/singer" tag="div" class="nav-item">
      <span class="nav-link">歌手</span>
    </router-link>
    <router-link to="/rank" tag="div" class="nav-item">
      <span class="nav-link">排行</span>
    </router-link>
    <router-link to="/search" tag="div" class="nav-item">
      <span class="nav-link">搜索</span>
    </router-link>
  </div>
</template>
<script>
export default {};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
.nav
  display: flex
  line-height: 44px
  font-size: $font-size-medium
.nav-item
  flex: 1
  text-align: center
.nav-link
  padding-bottom: 5px
  color: $color-text-l
&.router-link-active
  .nav-link
    color: $color-theme
    border-bottom: 2px solid $color-theme
</style>
