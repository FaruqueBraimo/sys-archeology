
const state = {
    globalConfigs: {
        actualPageTitle: 'Arqueologos',
        rightDrawerOpen: true,
        interviewsDate: ''
    },
    globalConfirm: {
        confirmed:  false,
        canShowModal:   false,
    }
}

const mutations = {
    setActualPageTitle(state, payload) {
        state.globalConfigs.actualPageTitle = payload
    },
    setGlobalConfigs(state, payload) {
        state.globalConfigs = payload
    },
    setGlobalConfirm(state, payload) {
        state.globalConfirm = payload
    }
}

const getters = {}

const actions = {
    setActualPageTitle({commit}, payload) {
        commit('setActualPageTitle', payload)
    },
    setGlobalConfirm({commit}, payload) {
        commit('setGlobalConfirm', payload)
    },
    setGlobalConfigs({commit}, payload) {
        commit('setGlobalConfigs', payload)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}