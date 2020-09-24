import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import global from '@/global/index.js'
import helpers from '@/helpers/index.js'
import vuetify from '@/plugins/vuetify';
import message from '@/plugins/message';
import pluginHelper from '@/helpers/pluginHelper.js'
import renderUIFromJSON from '@/plugins/renderUIFromJSON'
import DesignSystem from 'iztech-design-system-neo'
import 'iztech-design-system-neo/dist/system/system.css'

global.import()
Vue.config.productionTip = false
Vue.config.performance = true
Vue.config.devtools = true

Vue.use(renderUIFromJSON, {
  router,
  store
})

Vue.use(pluginHelper.create({
  $helpers: helpers,
  $message: message
}))

Vue.use(DesignSystem, {
  vendorId: "VENDOR",
  clientId: "CLIENT",
  api: ""
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
