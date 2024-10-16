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
                            <h2
                                class="text-xl font-semibold text-gray-700 leading-tight"
                            >
                                Users
                            </h2>

                            <div v-if="this.Form"  class="mt-3 flex flex-col sm:flex-row">
                                <div class="flex">
                                    <div class="relative">
                                        <select
                                            class="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                        >
                                            <option>All</option>
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>

                                        <div
                                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                                        >
                                            <svg
                                                class="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div class="block relative mt-2 sm:mt-0">
                                    <span
                                        class="absolute inset-y-0 left-0 flex items-center pl-2"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            class="h-4 w-4 fill-current text-gray-500"
                                        >
                                            <path
                                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"
                                            ></path>
                                        </svg>
                                    </span>

                                    <input
                                        placeholder="Search"
                                        class="rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    @click="userForm"
                                    class="bg-indigo-600 text-white px-5 p-2 my-2 rounded-md hover:bg-indigo-700"
                                >
                                    Add
                                </button>
                            </div>

                            <div
                            v-if="this.Form"
                                class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"
                            >
                                <div
                                    class="inline-block min-w-full shadow rounded-lg overflow-hidden"
                                >
                                    <div class="container mx-auto p-6">
                                        <h2 class="text-2xl font-semibold mb-6">
                                            Role Management
                                        </h2>

                                        <!-- Role Creation Form -->
                                        <form
                                            @submit.prevent="createRole"
                                            class="mb-8"
                                        >
                                            <div class="flex space-x-4">
                                                <input
                                                    v-model="newRole"
                                                    type="text"
                                                    placeholder="Enter role name (e.g., admin)"
                                                    class="w-full p-2 border rounded"
                                                    required
                                                />

                                            </div>
                                            <p
                                                v-if="errorMessage"
                                                class="text-red-500 mt-2"
                                            >
                                                {{ errorMessage }}
                                            </p>
                                            <p
                                                v-if="successMessage"
                                                class="text-green-500 mt-2"
                                            >
                                                {{ successMessage }}
                                            </p>

                                        <p>Permissions</p>

                                        <div class="grid grid-cols-4 gap-4 my-4">
                                            <div>
                                                <input type="checkbox" name="" id="">
                                            <label for="" class="ms-3">can delete</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="" id="">
                                            <label for="" class="ms-3">can edit</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="" id="">
                                            <label for="" class="ms-3">can manage</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="" id="">
                                            <label for="" class="ms-3">can read</label>
                                            </div>
                                        </div>
                                        <button
                                                    type="submit"
                                                    class="bg-blue-500 text-white px-4 py-2 mt-3 rounded hover:bg-blue-600"
                                                >
                                                    Create Role
                                                </button>
                                            </form>
                                    </div>

                                </div>
                            </div>


<div v-if="!this.Form" class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Color
                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Category
                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <div class="flex items-center">
                        Price
                        <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
  </svg></a>
                    </div>
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4">
                    Silver
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
                <td class="px-6 py-4">
                    $2999
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
        </tbody>
    </table>
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
import Sidebar from "../admin/Sidebar.vue";

export default {
    components: {
        Sidebar,
    },
    data() {
        return {
            roles: [],
            users: [],
            usersWithRoles: [],
            newRole: "",
            selectedUser: null,
            selectedRole: null,
            errorMessage: "",
            successMessage: "",
            Form : false
        };
    },
    mounted() {
        this.Form = false
        this.fetchRoles();
        this.fetchUsers();
    },
    computed: {
        ...mapGetters(["storeToken", "storeUserData"]),
    },
    methods: {
      userForm (){

                this.Form =true;
      },

        async fetchRoles() {
            try {
                const response = await api.get("/api/roles");
                this.roles = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchUsers() {
            try {
                const response = await api.get("/api/users");
                this.$store.dispatch("getUserData", response.data.userlist);
                this.users = this.storeUserData;
                this.usersWithRoles = response.data.usersWithRoles; // Assuming API response includes roles
            } catch (error) {
                console.error(error);
            }
        },
        async createRole() {
            try {
                const response = await api.post("/api/role/create", {
                    name: this.newRole,
                });
                this.successMessage = "Role created successfully";
                this.fetchRoles(); // Refresh roles list
                this.newRole = "";
            } catch (error) {
                this.errorMessage = "Failed to create role";
                console.error(error);
            }
        },
        async assignRole() {
            try {
                const response = await api.post("/api/assign-role", {
                    user_id: this.selectedUser,
                    role: this.selectedRole,
                });
                this.successMessage = "Role assigned successfully";
                this.fetchUsers(); // Refresh user list with roles
                this.selectedUser = null;
                this.selectedRole = null;
            } catch (error) {
                this.errorMessage = "Failed to assign role";
                console.error(error);
            }
        },
        async removeRole(userId) {
            try {
                await api.post("/api/remove-role", { user_id: userId });
                this.successMessage = "Role removed successfully";
                this.fetchUsers(); // Refresh user list with roles
            } catch (error) {
                this.errorMessage = "Failed to remove role";
                console.error(error);
            }
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 800px;
}
</style>
