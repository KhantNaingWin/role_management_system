<template>
    <div
        x-cloak
        class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition-transform duration-300 transform bg-gradient-to-b from-gray-900 to-gray-800 lg:translate-x-0 lg:static lg:inset-0 shadow-lg"
    >
        <div class="flex items-center justify-center mt-8">
            <div class="flex items-center">
                <button
                    @click="Profile"
                    class="ml-2 text-2xl font-semibold text-white"
                >
                    <i class="fa fa-user"></i>
                </button>
            </div>
        </div>

        <nav class="mt-10">
            <a
             v-if="permissions?.includes('read')"
                @click="userList"
                class="flex items-center px-6 py-3 mt-4 text-gray-300 transition-colors duration-200 transform hover:bg-blue-600 hover:text-white rounded-lg"
            >
                <i class="fa-solid fa-users text-blue-400"></i>
                <span class="ml-3">Users</span>
            </a>

            <a
                v-if="permissions?.includes('post_read')"
                @click="postPage"
                class="flex items-center px-6 py-3 mt-4 text-gray-300 transition-colors duration-200 transform hover:bg-green-600 hover:text-white rounded-lg"
            >
                <i class="fa-solid fa-newspaper text-green-400"></i>
                <span class="ml-3">Post</span>
            </a>

            <a
                v-if="currentRole ? currentRole[0]?.name === 'admin' : ''"
                @click="rolePage"
                class="flex items-center px-6 py-3 mt-4 text-gray-300 transition-colors duration-200 transform hover:bg-purple-600 hover:text-white rounded-lg"
            >
                <i class="fa-solid fa-shield-halved text-purple-400"></i>
                <span class="ml-3">Roles</span>
            </a>

            <button
                @click="logoutData"
                class="flex w-52 items-center py-2 mt-8 mx-auto bg-red-600 text-white rounded-lg transition duration-200 transform hover:bg-red-700 shadow-lg"
            >
                <div class="flex mx-auto">
                    <i class="fa-solid my-auto fa-right-from-bracket"></i>
                <span class="ms-1">Logout</span>
                </div>
            </button>
        </nav>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "../api/api";
export default {
    data() {
        return {
            currentRole: null,
            permissions: null,
        };
    },
    computed: {
        ...mapGetters(["authRole", "authPermission"]),
    },
    watch: {
        authRole(newVal) {
            this.currentRole = newVal;
        },
        authPermission(newVal) {
            this.permissions = newVal;
        },
    },
    methods: {
        async logoutData() {
            await api
                .post("/api/logout", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                })
                .catch((error) => {
                    console.log(error);
                });
            localStorage.removeItem("token");

            this.$router.push("/login");
        },
        postPage() {
            this.$router.push("/admin/posts");
        },
        userList() {
            this.$router.push("/admin/home");
        },
        rolePage() {
            this.$router.push("/admin/role");
        },
        Profile() {
            this.$router.push("/admin/profile");
        },
    },
    mounted() {
        this.$store.dispatch("adminAuthProfile");
    },
};
</script>
