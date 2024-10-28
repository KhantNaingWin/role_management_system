import { createStore } from "vuex";
import api from "../api/api";


export default createStore({
    state: {
        userData: [],
        token: localStorage.getItem("token"),
        postData: [],
        roles: [],
        permissions: [],
        userposts: [],
        profileData: {},
        editUser: [],
        updateSuccess: "",
        authPermission: [],
        authRole: null,
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        storeToken: (state) => state.token,
        storeUserData: (state) => state.userData,
        storePostData: (state) => state.postData,
        storeRoles: (state) => state.roles,
        userposts: (state) => state.userposts,
        profileData: (state) => state.profileData,
        storePermissions: (state) => state.permissions,
        storeEditUser: (state) => state.editUser,
        updateSuccess: (state) => state.updateSuccess,
        authPermission: (state) => state.authPermission,
        authRole: (state) => state.authRole,
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
        clearToken(state) {
            state.token = null;
            localStorage.removeItem("token");
        },
        getUserData(state, user) {
            state.userData = user;
        },
        createNewUser(state, newUser) {
            state.userData = [...newUser];
        },
        // updateUser(state, updatedUser) {
        //   const index = state.userData.findIndex(user => user.id === updatedUser.id);
        //   if (index !== -1) {
        //     state.userData.splice(index, 1, updatedUser); // Update the user in the array
        //   }
        // },
        deleteUser(state, userId) {
            state.userData = state.userData.filter(
                (user) => user.id !== userId
            );
        },
        //editUser
        editUser(state, user) {
            state.editUser = user;

        },
        //updateUser
        updateUser(state, data) {
            state.updateSuccess = data

        },
        // Role_Change
        Role_Change(state, data) {
            const index = state.userData.findIndex(user => user.id === data.user.id);
            if (index !== -1) {
                // Update the user's roles in the userData array
                state.userData[index].roles = data.user.roles; // Assuming `data.roles` contains the updated roles

                // Make sure this is reactive
                state.userData = [...state.userData]; // Trigger Vue's reactivity system
            }



        },


        updatePost(state, updatedPost) {
            const index = state.postData.findIndex(
                (post) => post.id === updatedPost.id
            );
            if (index !== -1) {
                state.postData.splice(index, 1, updatedPost); // Update the post in the array
            }
        },
        deletePost(state, postId) {
            state.postData = state.postData.filter(
                (post) => post.id !== postId
            );
        },
        setPosts(state, posts) {
            state.postData = posts;
        },
        addPost(state, newPost) {
            state.postData.push(newPost); // Add the new post to the state array
        },
        getRoles(state, getRoles) {
            state.roles = getRoles;
        },
        newRoles(state, newRole) {
            state.roles.push(newRole);
        },
        updateRole(state, updatedRole) {
            const index = state.roles.findIndex(
                (role) => role.id === updatedRole.id
            );
            if (index !== -1) {
                state.roles.splice(index, 1, updatedRole); // Update the role in the array
            }
        },
        deleteRole(state, roleId) {
            state.roles = state.roles.filter((role) => role.id !== roleId); // Remove role from the list
        },
        //user post list
        postlists(state, postlists) {
            state.userposts = postlists;
        },
        //profile
        profileData(state, profileData) {
            state.authRole = profileData.user.roles

            state.profileData = profileData;
            state.authPermission = profileData.permissions;

        },
        // updateprofileData
        updateprofileData(state, data) {
            state.profileData = data


        },
        // permissionlists
        permissionlists(state, data) {
            state.permissions = data
        }
    },
    actions: {
        login({ commit }, token) {
            commit("setToken", token);
        },
        register({ commit }, token) {
            commit("setToken", token);
        },
        logout({ commit }) {
            commit("clearToken");
        },
        async getUserData({ commit }) {
            try {
                const response = await api.get("api/admin");
                commit("getUserData", response.data);
            } catch (error) {
                console.error(error);
            }
        },
        async createUser({ commit }, newUser) {
            try {
                const response = await api.post("/api/admin", newUser);
                commit("createNewUser", response.data);
            } catch (error) {
                console.error(error);
            }
        },
        //edit user
        async fetchEditUser({ commit }, userId) {
            const response = await api.get(`/api/admin/${userId}/edit`);
            commit("editUser", response.data);
        },
        //update user
        async updateUser({ commit }, updatedUser) {
            try {
                const response = await api.put(`/api/admin/${updatedUser.id}`, updatedUser);
                commit("updateUser", response.data); // Assuming response.data contains the updated user
            } catch (error) {
                console.error(error);
            }
        },
        //delete user
        async deleteUser({ commit }, userId) {
            try {
                await api.delete(`/api/admin/${userId}`);
                commit("deleteUser", userId); // Remove user from the store
            } catch (error) {
                console.error(error);
            }
        },
        //role change
        async updateUserRole({ commit }, data) {
            try {
                const response = await api.patch(`/api/users/rolechange/${data.userId}`, {
                    role_id: data.newRole,
                });
                commit("Role_Change", response.data); // Assuming response.data contains the updated user
            } catch (error) {
                console.error(error);
            }
        },
        async fetchPosts({ commit }) {
            const response = await api.get("/api/post");
            commit("setPosts", response.data);
        },
        async createPost({ commit }, newPost) {
            const response = await api.post("/api/post", newPost);
            commit("addPost", response.data); // Assuming response.data contains the created post
        },
        async updatePost({ commit }, updatedPost) {
            const response = await api.put(
                `/api/post/${updatedPost.id}`,
                updatedPost
            );
            commit("updatePost", response.data); // Assuming response.data contains the updated post
        },
        async deletePost({ commit }, postId) {
            await api.delete(`/api/post/${postId}`);
            commit("deletePost", postId); // Remove post from the store
        },
        async getRoles({ commit }) {
            const response = await api.get("api/role");
            commit("getRoles", response.data);
        },
        //new role create
        async newRoles({ commit }, newRole) {
            const response = await api.post("api/role", newRole);

            commit("newRoles", response.data);
        },
        async updateRoles({ commit }, updatedRole) {
            const response = await api.put(
                `api/role/${updatedRole.id}`,
                updatedRole
            );
            commit("updateRole", response.data); // Assuming response.data contains the updated role
        },
        async deleteRole({ commit }, roleId) {
            await api.delete(`api/role/${roleId}`);
            commit("deleteRole", roleId); // Remove role from the store
        },
        //permissionlists

        async permissionlists({ commit }, id) {
            const res = await api.get(`/api/role/${id}`);
            commit('permissionlists', res.data.permissions)

        },


        //user
        async userpostlists({ commit }) {
            const response = await api.get("api/posts");
            commit("postlists", response.data);
        },
        //adminAuthProfile
        async adminAuthProfile({ commit }) {
            try {
                const response = await api.get("api/login/profile");
                commit("profileData", response.data);
            } catch (error) {
                console.error(error);

            }
        },
        //saveProfile
        async saveProfile({ commit }, profileData) {
            await api.put('api/authuser/update', profileData).then((response) => {
                commit("updateprofileData", response.data);
            }).catch((error) => {
                console.error(error.response.data);
            });

        }

    },
    modules: {},
});
