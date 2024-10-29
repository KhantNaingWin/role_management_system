<template>
    <div
        x-data="{ sidebarOpen: false }"
        class="flex h-screen bg-gray-100 font-roboto"
    >
        <!-- Overlay for mobile screens -->
        <div
            x-show="sidebarOpen"
            x-cloak
            @click="sidebarOpen = false"
            class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
        ></div>

        <!-- Sidebar -->
        <Sidebar />

        <!-- Main Content -->
        <div class="flex-1 overflow-hidden p-8">
            <!-- Form Section -->
            <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 class="text-2xl font-semibold mb-6 text-gray-800">
                    Edit Role
                </h2>
                <form @submit.prevent="saveRole">
                    <div class="mb-4">
                        <label
                            class="block text-gray-700 text-sm font-medium mb-2"
                            for="roleName"
                            >Role Name</label
                        >
                        <input
                            type="text"
                            v-model="editData.name"
                            id="roleName"
                            placeholder="Enter role name"
                            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div class="mb-6">
                        <label
                            class="block text-gray-700 text-sm font-medium mb-2"
                            >Permissions</label
                        >
                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div
                                v-for="p in permissions"
                                :key="p.id"
                                class="flex items-center space-x-2"
                            >
                                <input
                                    type="checkbox"
                                    v-model="editData.permissions"
                                    :value="p.name"
                                    :id="p.id"
                                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label :for="p.id" class="text-gray-700">{{
                                    p.name
                                }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <button
                            type="submit"
                            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
            <!-- alert message  -->
            <div
                v-if="showAlert"
                class="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 mt-3 rounded relative"
            >
                <span class="block sm:inline">{{ successMessage }}</span>
                <button
                    @click="showAlert = false"
                    class="absolute top-0 bottom-0 right-0 px-4 py-3"
                >
                    <svg
                        class="fill-current h-6 w-6 text-green-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.586 7.066 4.652A1 1 0 105.652 6.066L8.586 9l-2.934 2.934a1 1 0 101.414 1.414L10 10.414l2.934 2.934a1 1 0 001.414-1.414L11.414 9l2.934-2.934z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from "../admin/Sidebar.vue";
import api from "../api/api";

export default {
    components: {
        Sidebar,
    },
    data() {
        return {
            editData: {
                name: "",
                permissions: [],
            },
            permissions: [],
            successMessage: "",
            showAlert: false,
        };
    },
    methods: {
        async saveRole() {
            this.userId = this.$route.params.id;
            await api
                .put(`/api/role/${this.userId}`, this.editData)
                .then((res) => {
                    this.successMessage = res.data.original.message ||  "Role updated successfully";;
                    this.showAlert = true;
                    setTimeout(() => {
                        this.showAlert = false;
                    }, 3000);


                })
                .catch((error) => {
                    console.log(error);
                });
                this.$store.dispatch("adminAuthProfile");
        },
        async fetchData() {
            this.userId = this.$route.params.id;
            await api.get(`/api/role/${this.userId}/edit`).then((res) => {
                this.editData.name = res.data.name;
                this.editData.permissions = res.data.selected_permission_list;
            });
            await api.get("/api/permission").then((res) => {
                this.permissions = res.data;
            });
        },
    },
    mounted() {
        this.fetchData();
    },
};
</script>
