//state的代理 && 计算属性
export const currentSong = state => {
  return state.playlist[state.currentIndex] || {} //当前歌曲
}
