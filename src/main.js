import Vue from 'vue'
import App from './App.vue'
import '@vant/touch-emulator';
import VueSocketIO from 'vue-socket.io'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css';

import router from "./router";

Vue.use(Vant)
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://127.0.0.1:7001',
  options: {
    query: {
      room: 'demo',
    },
  }
}))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
