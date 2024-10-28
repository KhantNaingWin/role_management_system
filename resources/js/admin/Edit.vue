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
                                            @submit.prevent="UpdateUser"
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
                                                    v-model="formData.name"
                                                    placeholder="User name"
                                                />
                                            </div>
                                            <div class="mb-4">
                                                <label
                                                    class="block text-gray-700 text-sm font-bold mb-2"
                                                    :for="formData.email"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    :id="formData.email"
                                                    type="email"
                                                    v-model="formData.email"
                                                    placeholder="User email"
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
                                                    value="editUse"
                                                    placeholder="*****"
                                                />
                                            </div>
                                            <!-- <div class="mb-4">
                                                <label
                                                    for="role"
                                                    class="block text-gray-700 text-sm font-bold mb-2"
                                                >
                                                    Role
                                                </label>
                                                <select
                                                    id="role"
                                                    v-model="formData.roles"
                                                    class="block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                >
                                                    <option
                                                        v-for="role in roles"
                                                        :key="role.id"
                                                        :value="role.id"
                                                    >
                                                        {{ role.name }}
                                                    </option>
                                                </select>
                                            </div> -->
                                            <div
                                                class="flex items-center justify-between"
                                            >
                                                <button
                                                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                    type="submit"
                                                >
                                                    Update
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
            formData: {
                name: "",
                email: "",
                password: "",
            },
            message: "",
            messageStatus: false,
            userId: null,
        };
    },
    computed: {
        ...mapGetters(["storeEditUser","updateSuccess"]),
    },
    watch: {
        storeEditUser(newValue) {
            this.formData = newValue[0];
        },
        updateSuccess(newValue) {
            if (newValue) {
                this.message = "User updated successfully";
                this.messageStatus = true;
                setTimeout(() => {
                    this.message = "";
                    this.messageStatus = false;
                }, 3000);
            }
            else {
                this.message = "Failed to update user";
                this.messageStatus = false;
            }
        },
    },

    methods: {
        async UpdateUser() {
            await this.$store.dispatch("updateUser", this.formData);
        },
        async fetchData(userId) {
            // const response = await api.get(`/api/admin/${userId}/edit`);

            try {
                this.$store.dispatch("fetchEditUser", userId);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            //
        },
    },

    mounted() {
        if (this.$route.params.id) {
            this.userId = this.$route.params.id;
            this.fetchData(this.userId);
        } else {
            console.error("No ID found in the route parameters");
        }
    },
};
</script>
