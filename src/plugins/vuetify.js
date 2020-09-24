import Vue from 'vue'
import DesignSystem from 'iztech-design-system-neo'
import 'iztech-design-system-neo/dist/system/system.css'
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
Vue.use(DesignSystem)
Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)