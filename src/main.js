import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import fastclick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'common/stylus/index.styl'
import 'swiper/dist/css/swiper.css'

Vue.prototype.$axios = axios
fastclick.attach(document.body)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  // template: '<App/>'
  render(createElement) {
    return createElement(App);
  }
})
