//Song类
export default class Song {
  constructor({
    id, //歌曲id
    mid, //歌曲mid
    name, //歌曲名
    albumname, //歌曲专辑名
    duration, //歌曲时常
    image, //歌曲图片
    url, //播放地址
    singer //歌手(Array）
  }) {
    this.id = id;
    this.mid = mid;
    this.name = name;
    this.albumname = albumname;
    this.duration = duration;
    this.image = image;
    this.url = url;
    this.singer = singer;
  }
}

//工厂函数, 批量生产Song, 避免多次new调用
export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    name: musicData.songname,
    albumname: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`,
    // https://api.bzqll.com/music/tencent/url?id=${Song.mid}&key=579621905&br=320
    singer: filterSinger(musicData.singer),
  })
}

//处理多个歌手
function filterSinger(singer) {
  if (!singer) return '';
  let ret = [];
  singer.forEach(item => {
    ret.push(item.name)
  })
  return ret.join('/');
}
