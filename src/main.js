import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import fastclick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyLoad from 'vue-lazyload'

import 'common/stylus/index.styl'
import 'swiper/dist/css/swiper.css'

Vue.prototype.$axios = axios
fastclick.attach(document.body)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyLoad, {
  loading: require('common/images/default.png')
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  render(createElement) {
    return createElement(App);
  }
})
