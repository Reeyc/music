import originJSONP from 'jsonp'

/**
 * @description 工具函数, 对象转url参数
 */
function params(data) {
  let url = '';
  for (let key in data) {
    let value = data[key] === undefined ? '' : data[key]; //验证非法value
    value = encodeURIComponent(value); //转码URL中文
    url += `&${key}=${value}`;
  }
  return url ? url.substr(1) : ''; //去除第一个&符号
}

/**
 * @description JSONP封装
 */
function jsonp(url, data, option) {
  let jion = url.indexOf('?') < 0 ? '?' : '&'; //拼接符, 首次拼接加?号
  url += jion + params(data);
  return new Promise((res, rej) => { //返回一个异步对象
    originJSONP(url, option, (err, data) => {
      if (!err) {
        res(data)
      } else {
        rej(err)
      }
      // !err ? res(data) : rej(err); //调用jsonp插件对象
    })
  })
}

export default jsonp;
