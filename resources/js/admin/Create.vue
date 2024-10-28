<template>
    <div
        x-data="{ sidebarOpen: false }"
        class="flex h-screen bg-gray-100 font-roboto"
    >
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <main class="flex-1 overflow-x-hidden overflow-y-auto">
                <div class="container mx-auto px-6 py-8">
                    <div class="mt-8">
                        <div class="mt-6">
                            <div
                                class="sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"
                            >
                                <!-- Toast Notification -->
                                <div
                                    v-if="messageStatus"
                                    id="toast-success"
                                    class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-900 bg-green-100 rounded-lg shadow"
                                    role="alert"
                                >
                                    <div
                                        class="inline-flex items-center justify-center w-8 h-8 text-green-500 bg-green-200 rounded-lg"
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
                                    </div>
                                    <div class="ml-3 text-sm font-medium">
                                        {{ message }}
                                    </div>
                                    <button
                                        @click="messageStatus = false"
                                        type="button"
                                        class="ml-auto text-gray-500 hover:text-gray-700"
                                        aria-label="Close"
                                    >
                                        <span class="sr-only">Close</span>
                                        <svg
                                            class="w-4 h-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M4 4l6 6m0-6L4 10"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <!-- Form for User Creation -->
                                <div
                                    class="flex justify-center min-w-full shadow-lg rounded-lg overflow-hidden bg-white p-6"
                                >
                                    <div class="w-full max-w-md">
                                        <form
                                            @submit.prevent="createNewUser"
                                            class="bg-white rounded px-8 pt-6 pb-8 mb-4 space-y-4"
                                        >
                                            <div>
                                                <label
                                                    class="block text-gray-700 text-sm font-medium mb-2"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    type="text"
                                                    v-model="formData.name"
                                                    placeholder="Enter your name"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    class="block text-gray-700 text-sm font-medium mb-2"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    type="email"
                                                    v-model="formData.email"
                                                    placeholder="Enter your email"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    class="block text-gray-700 text-sm font-medium mb-2"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    type="password"
                                                    v-model="formData.password"
                                                    placeholder="Enter your password"
                                                />
                                            </div>
                                            <div>
                                                <p
                                                    class="text-gray-700 text-sm font-medium mb-2"
                                                >
                                                    Roles
                                                </p>
                                                <div class="flex space-x-4">
                                                    <div
                                                        v-for="role in role"
                                                        :key="role.id"
                                                        class="flex items-center"
                                                    >
                                                        <input
                                                            type="radio"
                                                            v-model="
                                                                formData.role
                                                            "
                                                            :value="role.id"
                                                            class="form-radio text-indigo-600"
                                                        />
                                                        <label
                                                            class="ml-2 text-gray-600"
                                                            >{{
                                                                role.name
                                                            }}</label
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="flex items-center justify-between"
                                            >
                                                <button
                                                    class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:from-indigo-600 hover:to-blue-600"
                                                    type="submit"
                                                >
                                                    Create User
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
import { mapGetters } from "vuex";
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
                role: [],
            },
            roles: [],

            message: "",
            messageStatus: false,
        };
    },
    computed: {
        ...mapGetters(["storeRoles"]),
        role() {
            return this.storeRoles;
        },
    },
    methods: {
        createNewUser() {
            this.$store
                .dispatch("createUser", this.formData)
                .then(() => {
                    this.message = "User created successfully!";
                    this.messageStatus = true;
                    this.formData = { name: "", email: "", password: "" };
                })
                .catch((error) => {
                    console.error("Error creating user:", error);
                });
        },
        async fetchData() {
            this.messageStatus = false;
            try {
                this.$store.dispatch("getRoles");
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
