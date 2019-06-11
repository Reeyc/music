import {
  playMode
} from 'common/js/config'

const state = {
  singers: {}, //歌手信息
  playing: false, //播放状态
  fullScreen: false, //是否全屏
  playlist: [], //播放列表
  sequenceList: [], //相对于播放模式的播放列表
  mode: playMode.sequence, //播放模式
  currentIndex: -1, //歌曲索引
}

export default state
