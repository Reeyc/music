<!--歌手页-->
<template>
  <div>
    <div class="fiexd">
      <list-view :singers="singers" @locaItem="location"></list-view>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import ListView from "base/listview/ListView";
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Singer from "common/js/singer";
import { mapMutations } from "vuex";
const HOT_NAME = "热门";
const HOT_SINGER_LEN = 10;
export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    ...mapMutations(["SET_SINGERS"]),
    location(item) {
      this.$router.push(`/singer/${item.id}`);
      this.SET_SINGERS(item); //设置mutation
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code !== ERR_OK) return;
        this.singers = this._normalizeSingers(res.data.list);
      });
    },
    //将数据转换为需要的数据格式
    _normalizeSingers(list) {
      //所有数据
      let map = {
        hot: {
          title: HOT_NAME,
          item: []
        }
      };
      list.forEach((item, index) => {
        //处理热门数据
        if (index < HOT_SINGER_LEN) {
          map.hot.item.push(new Singer(item.Fsinger_mid, item.Fsinger_name));
        }
        //==============
        //处理ABCDE...数据
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            item: []
          };
        }
        map[key].item.push(new Singer(item.Fsinger_mid, item.Fsinger_name));
      });
      //=============
      //map是对象(无序), 处理排序问题
      let hot = [];
      let alphabet = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          //字母添加到字母数组中
          alphabet.push(val);
        } else if (val.title === HOT_NAME) {
          //热门添加到热门数组中
          hot.push(val);
        }
      }
      alphabet.sort((a, b) => {
        //利用Unicode编码对字母表进行排序
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(alphabet); //热门数组拼接字母数组, 使热门数组排前面
    }
  },
  components: {
    ListView
  }
};
</script>
<style lang="stylus" scoped>
.fiexd
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
// 组件切换动画
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
</style>
