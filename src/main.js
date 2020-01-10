import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './layouts/router'
import Toasted from 'vue-toasted'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Toasted, {
    iconPack: 'fontawesome'
})

Vue.config.productionTip = false
Vue.config.runtimeCompiler = true

new Vue({
    router,
    el: '#app'
});
