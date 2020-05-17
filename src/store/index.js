import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ipaddr:null,
    files:null
  },
  getters: {
    ipaddr(state) {
      return state.ipaddr
    },
    files(state) {
      return state.files
    }
  },
  mutations: {
    setIpAddress(state,payload) {
      this.state.ipaddr = payload.ip
    },
    setFiles(state,payload){
      this.state.files = payload.files
    }
  },
  actions: {
  },
  modules: {
  }
})
