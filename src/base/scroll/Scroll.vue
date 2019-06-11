<!--通用滚动组件-->
<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: { //是否实时监听Better-Scroll钩子事件 (默认不监听)
      type: Number,
      default: 1
    },
    click: { //Better-Scroll会阻止click事件, 是否代替浏览器派发一个click事件 (默认是)
      type: Boolean,
      default: true
    },
    data: { //数据
      type: Array,
      default: null
    },
    listenScroll: { //是否执行scroll事件, 并传递数据出去
      type: Boolean,
      default: false
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 50);
  },
  methods: {
    _initScroll() { //初始化Better-Scroll
      if (!this.$refs.wrapper) return;
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      });
      if (this.listenScroll) {
        let _this = this;
        this.scroll.on("scroll", pos => {
          //向外触发事件，并把值传递出去
          _this.$emit("scroll", pos);
        });
      }
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh(); //当数据变化, 重新计算高度
      }, 50);
    }
  }
};
</script>
