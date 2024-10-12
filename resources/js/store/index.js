import { createStore } from 'vuex'

export default createStore({
  state: {
    userData : {},
    token: localStorage.getItem('token'),

  },
  getters: {
    isAuthenticated: state => !!state.token, // Check if user is authenticated
    storeToken: state => state.token,
    storeUserData : state =>state.userData,
  },
  mutations: {
    setToken(state, token) {
        state.token = token;
        localStorage.setItem('token', token); // Store in localStorage
      },
      clearToken(state) {
        state.token = null;
        localStorage.removeItem('token'); // Remove from localStorage
      },
      getUserData(state,userData){
        state.userData = userData
      }
  },
  actions: {
    login({ commit }, token) {
        // Store token upon login
        commit('setToken', token);
      },
      register({ commit }, token) {
        // Store token upon login
        commit('setToken', token);
      },
      logout({ commit }) {
        // Clear token upon logout
        commit('clearToken');
      },
      getUserData({commit},userData){
        commit('getUserData',userData)
      }
  },
  modules: {
  }
})
