const state = {
    user: {},
};

const mutations = {
    setUserData(state, userInformation) {
        state.user = userInformation
    },

    clearUserData(state) {
        state.user = {};
    },
};

export default {
    state,
    mutations
}