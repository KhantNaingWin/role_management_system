<template>
    <div
        x-data="{ sidebarOpen: false }"
        class="flex h-screen bg-gray-200 font-roboto"
    >
        <div
            x-cloak
            class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
        ></div>
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div class="container mx-auto px-6 py-8">
                    <div class="mt-8">
                        <div class="mt-6">

                            <div
                                class="sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"
                            >
                                <!-- message button  -->
                                <div
                                v-if="messageStatus"
                                    id="toast-success"
                                    class="flex content-center mx-auto items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                                    role="alert"
                                >
                                    <div
                                        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
                                    >
                                        <svg
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
                                            />
                                        </svg>
                                        <span class="sr-only">Check icon</span>
                                    </div>
                                    <div class="ms-3 text-sm font-normal">
                                        {{ message }}
                                    </div>
                                    <button
                                        type="button"
                                        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                                        data-dismiss-target="#toast-success"
                                        aria-label="Close"
                                    >
                                        <span class="sr-only">Close</span>
                                        <svg
                                            class="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div
                                    class="flex justify-center min-w-full shadow rounded-lg overflow-hidden"
                                >
                                    <div class="w-full max-w-xs">
                                        <form
                                            @submit.prevent="createNewUser"
                                            class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                                        >
                                            <div class="mb-4">
                                                <label
                                                    class="block text-gray-700 text-sm font-bold mb-2"
                                                    for="username"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="username"
                                                    type="text"
                                                    v-model="this.formData.name"
                                                    placeholder="Username"
                                                />
                                            </div>
                                            <div class="mb-4">
                                                <label
                                                    class="block text-gray-700 text-sm font-bold mb-2"
                                                    for="username"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="useremail"
                                                    type="email"
                                                    v-model="
                                                        this.formData.email
                                                    "
                                                    placeholder="Useremail"
                                                />
                                            </div>
                                            <div class="mb-6">
                                                <label
                                                    class="block text-gray-700 text-sm font-bold mb-2"
                                                    for="password"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="password"
                                                    type="password"
                                                    v-model="
                                                        this.formData.password
                                                    "
                                                    placeholder="*****"
                                                />
                                                <!-- <p
                                                    class="text-red-500 text-xs italic"
                                                >
                                                    Please choose a password.
                                                </p> -->
                                            </div>
                                            <div class="mb-6">
                                                <p>Permissions</p>
                                            </div>
                                            <div
                                                class="mb-6 grid grid-cols-2 gap-3"
                                            >
                                                <div
                                                    class=""
                                                    v-for="permission in this
                                                        .permissions"
                                                    :key="permission.id"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        v-model="
                                                            this.formData
                                                                .permission
                                                        "
                                                        :value="permission.name"
                                                        
                                                    />
                                                    <label
                                                        for=""
                                                        class="ms-2"
                                                        >{{
                                                            permission.name
                                                        }}</label
                                                    >
                                                </div>
                                            </div>
                                            <div class="">
                                                <p>Roles</p>
                                            </div>
                                            <div
                                                class="mb-6 grid grid-cols-2 gap-3"
                                            >
                                                <div
                                                    v-for="role in this.roles"
                                                    :key="role.id"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        v-model="
                                                            this.formData.role
                                                        "
                                                        :value="role.name"
                                                    />
                                                    <label
                                                        for=""
                                                        class="ms-2"
                                                        >{{ role.name }}</label
                                                    >
                                                </div>
                                            </div>
                                            <div
                                                class="flex items-center justify-between"
                                            >
                                                <button
                                                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                    type="submit"
                                                >
                                                    Create
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex/dist/vuex.cjs.js";
import api from "../api/api";
import Sidebar from "./Sidebar.vue";

export default {
    components: {
        Sidebar,
    },
    data() {
        return {
            roles: [],
            permissions: [],
            formData: {
                name: "",
                email: "",
                password: "",
                permission: [],
                role: [],
                message: "",
                messageStatus : false ,
            },
        };
    },
    computed: {
        ...mapGetters(["storePermission", "storeRoles"]),
    },
    methods: {
        async createNewUser() {
            await api
                .post("/api/admin", this.formData)
                .then((res) => {
                    this.$store.dispatch("getUserData", res.data);
                    this.formData = {};
                    this.message = res.data.message;
                    this.messageStatus = true;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        async fetchData() {
            try {
                const response = await api.get("api/role");
                const res = await api.get("api/permission");
                this.$store.dispatch("getPermissions", res.data);
                this.permissions = this.storePermission;

                this.$store.dispatch("getRoles", response.data);
                this.roles = this.storeRoles;
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<style lang="scss" scoped></style>
