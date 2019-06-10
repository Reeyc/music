<!--歌手详情页-->
<template>
  <transition name="slide">
    <music-list :songs="songs" :singerTitle="singerTitle" :singerImg="singerImg"></music-list>
  </transition>
</template>

<script>
import MusicList from "./Music-list";
import { getSingerDetail } from "api/singer";
import { ERR_OK } from "api/config";
import { createSong } from "common/js/song";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  created() {
    this._getSingerDetail();
  },
  data() {
    return {
      songs: []
    };
  },
  computed: {
    ...mapState(["singers"]), //获取state
    singerTitle() {
      return this.singers.name;
    },
    singerImg() {
      return this.singers.avatar;
    }
  },
  methods: {
    _getSingerDetail() {
      if (!this.singers.id) {
        this.$router.push("/singer");
        return;
      }
      getSingerDetail(this.singers.id).then(res => {
        if (res.code === ERR_OK && res.data) {
          this.songs = this._normalizeSongs(res.data.list);
        }
      });
    },
    //数据处理
    _normalizeSongs(list) {
      //list=>大数组
      let ret = [];
      list.forEach(item => {
        //item=>数组内每个对象
        let { musicData } = item; //对象解构赋值
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  components: {
    MusicList
  }
};
</script>

<style lang="stylus" scoped>
</style>
