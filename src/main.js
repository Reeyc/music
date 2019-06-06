import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'

import 'common/stylus/index.styl'

fastclick.attach(document.body)

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
