import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ipaddr:null,
    file:null
  },
  getters: {
    ipaddr(state) {
      return state.ipaddr
    },
    file(state) {
      return state.file
    }
  },
  mutations: {
    setIpAddress(state,payload) {
      this.state.ipaddr = payload.ip
    },
    setFile(state,payload){
      this.state.file = payload.file
    }
  },
  actions: {
  },
  modules: {
  }
})
