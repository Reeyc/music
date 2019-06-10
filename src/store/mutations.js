import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGERS](state, singers) { //歌手信息
    state.singers = singers;
  }
}

export default mutations
