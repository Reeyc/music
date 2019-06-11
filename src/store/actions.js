import * as types from './mutation-types'

//actions批量提交mutation

//选中播放
export const selectPlay = function (context, data) {
  //提交到mutations
  context.commit(types.SET_PLAYING_STATE, true); //设置播放中
  context.commit(types.SET_FULL_SCREEN, true); //设置全屏
  context.commit(types.SET_PLAYLIST, data.list); //设置播放列表
  context.commit(types.SET_SEQUENCE_LIST, data.list); //设置相对于播放模式的播放列表
  context.commit(types.SET_CURRENT_INDEX, data.index); //设置歌曲索引
}
