import { createStore } from "vuex";
import api from "../api/api";


export default createStore({
    state: {
        userData: [],
        postData: [],
        roles: [],
        permissions: [],
        userposts: [],
        profileData: {},
        editUser: [],
        updateSuccess: "",
        authPermission: [],
        authRole: null,
        pagination: null,
        allroles: [],
    },
    getters: {
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
        allroles: (state) => state.allroles,
    },
    mutations: {
        getUserData(state, user) {
            state.userData = user.data;

        },
        createNewUser(state, newUser) {
            state.userData = newUser;
        },
        deleteUser(state, userId) {
            state.userData.data = state.userData.data.filter(
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

            const index = state.userData?.data.findIndex(user => user.id === data.user.id);
            if (index !== -1) {
                state.userData.data[index].roles = data.user.roles;

                state.userData.data = [...state.userData.data]; // Trigger Vue's reactivity system
            }



        },


        updatePost(state, updatedPost) {
            try {
                state.postData.data = [state.postData?.data, { ...updatedPost }];
            } catch (error) {
                console.error(error);
            }

        },
        deletePost(state, postId) {
            state.postData.data = state.postData?.data.filter(
                (post) => post.id !== postId
            );
        },
        setPosts(state, posts) {
            state.postData = posts.data;
        },
        addPost(state, newPost) {
            state.postData?.data.push(newPost); // Add the new post to the state array
        },
        getRoles(state, getRoles) {
            state.roles = getRoles;
        },
        newRoles(state, newRole) {
           state.roles = newRole;

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
            // console.log(state.roles.roles.data,roleId);
            console.log("Delete Role", roleId);

            state.roles.roles.data = state.roles.roles.data.filter((role) => role.id !== roleId);
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
        },
        //allRoles
        allRoles(state, data) {
            state.allroles = data
        }
    },
    actions: {
        // },
        async getUserData({ commit }, { page, per_page }) {
            try {
                const response = await api.get(`api/admin/?page=${page}&per_page=${per_page}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }

                });
                commit("getUserData", response);
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
                    role_id: data.selectedRole,
                });
                commit("Role_Change", response.data); // Assuming response.data contains the updated user
            } catch (error) {
                console.error(error);
            }
        },
        async fetchPosts({ commit }, post) {
            const response = await api.get(`/api/post?page=${post.page}&per_page=${post.itemsPerPage}&search=${post.search ? post.search : ""}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }

            );
            commit("setPosts", response);
        },
        async createPost({ commit }, newPost) {
            const response = await api.post("/api/post", newPost);
            commit("addPost", response.data);
        },
        async updatePost({ commit }, updatedPost) {
            const response = await api.put(
                `/api/post/${updatedPost.id}`,
                updatedPost
            );
            commit("updatePost", response.data?.[0]);
        },
        async deletePost({ commit }, postId) {
            await api.delete(`/api/post/${postId}`);
            commit("deletePost", postId); // Remove post from the store
        },
        async fetchRoles({ commit }, role) {
           const response = await api.get(`api/role?page=${role.page}&per_page=${role.itemsPerPage}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            commit("getRoles", response.data);
        },
        async getRoles({ commit }) {
            const response = await api.get("api/roles", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            commit("allRoles", response.data);
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
            const response = await api.get("api/posts",
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            commit("postlists", response.data);
        },
        //adminAuthProfile
        async adminAuthProfile({ commit }) {

            try {
                const response = await api.get("api/login/profile", {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });


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
