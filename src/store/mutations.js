import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGERS](state, singers) { //歌手信息
    state.singers = singers;
  },
  [types.SET_PLAYING_STATE](state, flag) { //播放状态
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) { //是否全屏
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) { //播放列表
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) { //相对于播放模式的播放列表
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) { //播放模式
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) { //歌曲索引
    state.currentIndex = index
  },
}

export default mutations
