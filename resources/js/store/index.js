import { createStore } from 'vuex'

export default createStore({
  state: {
    userData : {},
    token: localStorage.getItem('token'),
    postData: [],
    roles : [],
    permissions : []

  },
  getters: {
    isAuthenticated: state => !!state.token, // Check if user is authenticated
    storeToken: state => state.token,
    storeUserData : state =>state.userData,
    storePostData: state => state.postData,
    storeRoles : state =>state.roles,
    storePermission : state =>state.permissions
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
      },
      addPost(state, newPost) {
        state.postData=newPost; // Add a new post to the postData array
      },
      clearPostData(state) {
        state.postData = []; // Clear postData
      },
      allPosts(state,allPosts){
        state.postData = allPosts;
      },
      getRoles (state,getRoles){
        state.roles = getRoles;
      },
      getPermissions(state,getPermissions){
        state.permissions = getPermissions
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
      },
      createPost({ commit }, newPost) {
        // Add a new post to the state
        commit('addPost', newPost);
      },
      allPosts({ commit }, allPosts) {
        // Add a new post to the state
        commit('allPosts', allPosts);
      },
      getRoles ({commit},getRoles){
        commit ('getRoles',getRoles)
      },
      getPermissions ({commit},getPermissions){
        commit ('getPermissions',getPermissions)
      }

  },
  modules: {
  }
})
