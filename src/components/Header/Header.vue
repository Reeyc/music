<template>
  <div class="header">
    <div class="icon"></div>
    <h1 class="text">Hello World</h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'
@import '~common/stylus/mixin.styl'
.header
  position: relative
  height: 44px
  text-align: center
  font-size: 0
  color: $color-theme
.icon
  display: inline-block
  vertical-align: top
  margin-top: 6px
  width: 30px
  height: 32px
  margin-right: 9px
  bg-image('logo')
  background-size: 30px 32px
.text
  display: inline-block
  vertical-align: top
  line-height: 44px
  font-size: $font-size-large
</style>