import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Toasted from 'vue-toasted'
import router from './layouts/router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Toasted, {
    iconPack: 'fontawesome'
})

Vue.config.productionTip = false
Vue.config.runtimeCompiler = true

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
