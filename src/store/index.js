import Vue from 'vue'
import Vuex from 'vuex'
import userDetails from './modules/userDetails'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        userDetails,
    },
    strict: debug,
})
