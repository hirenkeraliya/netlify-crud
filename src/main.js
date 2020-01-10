import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './layouts/router'
import Toasted from 'vue-toasted'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Toasted, {
    iconPack: 'fontawesome'
})

Vue.config.productionTip = false
Vue.config.runtimeCompiler = true

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
