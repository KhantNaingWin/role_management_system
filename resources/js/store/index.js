import { createStore } from 'vuex'
import api from '../api/api';

export default createStore({
  state: {
    userData: [],
    token: localStorage.getItem('token'),
    postData: [],
    roles: [],
    permissions: [],
    userposts: []
  },
  getters: {
    isAuthenticated: state => !!state.token,
    storeToken: state => state.token,
    storeUserData: state => state.userData,
    storePostData: state => state.postData,
    storeRoles: state => state.roles,
    userposts : state => state.userposts,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
    getUserData(state, user) {
        state.userData = user;






    },
    createNewUser(state, newUser) {
      state.userData  = [...newUser];
    },
    // updateUser(state, updatedUser) {
    //   const index = state.userData.findIndex(user => user.id === updatedUser.id);
    //   if (index !== -1) {
    //     state.userData.splice(index, 1, updatedUser); // Update the user in the array
    //   }
    // },
    deleteUser(state, userId) {
      state.userData = state.userData.filter(user => user.id !== userId);
    },

    updatePost(state, updatedPost) {
      const index = state.postData.findIndex(post => post.id === updatedPost.id);
      if (index !== -1) {
        state.postData.splice(index, 1, updatedPost); // Update the post in the array
      }
    },
    deletePost(state, postId) {
      state.postData = state.postData.filter(post => post.id !== postId);
    },
    setPosts(state, posts) {
      state.postData = posts;
    },
    getRoles (state,getRoles){
        state.roles = getRoles;
      },
      newRoles(state,newRole){
        state.roles = [...newRole];
      },
      updateRole(state, updatedRole) {
        const index = state.roles.findIndex(role => role.id === updatedRole.id);
        if (index !== -1) {
          state.roles.splice(index, 1, updatedRole); // Update the role in the array
        }
      },
      deleteRole(state, roleId) {
        state.roles = state.roles.filter(role => role.id !== roleId); // Remove role from the list
      },
      //user post list
      postlists(state,postlists){
        state.userposts = postlists;
      }
  },
  actions: {
    login({ commit }, token) {
      commit('setToken', token);
    },
    register({ commit }, token) {
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('clearToken');
    },
   async getUserData({ commit }) {
        try {
            const response = await api.get("api/admin");
            commit('getUserData', response.data);

        } catch (error) {
            console.error(error);
        }
    },
    async createUser({ commit }, newUser) {
      try {
        const response = await api.post('/api/admin', newUser);
        commit('createNewUser', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteUser({ commit }, userId) {
      try {
        await api.delete(`/api/admin/${userId}`);
        commit('deleteUser', userId); // Remove user from the store
      } catch (error) {
        console.error(error);
      }
    },
    async fetchPosts({ commit }) {
      const response = await api.get('/api/post');
      commit('setPosts', response.data);
    },
    async createPost({ commit }, newPost) {
      const response = await api.post('/api/post', newPost);
      commit('addPost', response.data); // Assuming response.data contains the created post
    },
    async updatePost({ commit }, updatedPost) {
      const response = await api.put(`/api/post/${updatedPost.id}`, updatedPost);
      commit('updatePost', response.data); // Assuming response.data contains the updated post
    },
    async deletePost({ commit }, postId) {
      await api.delete(`/api/post/${postId}`);
      commit('deletePost', postId); // Remove post from the store
    },
    async getRoles ({commit}){
        const response = await api.get("api/role");
        commit ('getRoles',response.data)
      },
      async newRoles({commit},newRole){
        const response = await api.post("api/role",newRole);
        commit('newRoles',response.data)
      },
      async updateRoles({ commit }, updatedRole) {
        const response = await api.put(`api/role/${updatedRole.id}`, updatedRole);
        commit('updateRole', response.data); // Assuming response.data contains the updated role
      },
      async deleteRole({ commit }, roleId) {
        await api.delete(`api/role/${roleId}`);
        commit('deleteRole', roleId); // Remove role from the store
      },

      //user
      async userpostlists({ commit }) {
        const response = await api.get("api/posts");
        commit('postlists', response.data);
      }

  },
  modules: {},
});
