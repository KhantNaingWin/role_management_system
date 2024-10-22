<template>
    <div
        x-data="{ sidebarOpen: false }"
        class="flex h-screen bg-gray-200 font-roboto"
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
        <div class="flex-1 flex flex-col overflow-hidden p-6">
            <!-- Form Section -->
            <div class="mb-6">
                <form @submit.prevent="newRole" class="flex gap-2">
                    <input
                        type="text"
                        placeholder="Create new role"
                        v-model="role.name"
                        class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Create
                    </button>
                </form>
            </div>

            <!-- Role List Section -->
            <div>
                <h3 class="text-xl font-semibold mb-4">Role List</h3>
                <ul class="space-y-2">
                    <li
                        v-for="role in roles"
                        :key="role.id"
                        class="flex items-center justify-between p-4 bg-white rounded-md shadow-sm"
                    >
                        <span v-if="editRoleId !== role.id">{{
                            role.name
                        }}</span>
                        <input
                            v-if="editRoleId === role.id"
                            type="text"
                            v-model="role.name"
                            @keyup.enter="saveRole(role)"
                            @blur="editRoleId = null"
                            class="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div class="flex space-x-2">
                            <button
                                @click="editRole(role.id)"
                                class="text-blue-500 hover:text-blue-600 flex items-center"
                            >
                                <i class="fas fa-edit mr-1"></i> Edit
                            </button>
                            <button
                                @click="deleteRole(role.id)"
                                class="text-red-500 hover:text-red-600 flex items-center"
                            >
                                <i class="fas fa-trash-alt mr-1"></i> Delete
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex/dist/vuex.cjs.js";
import Sidebar from "../admin/Sidebar.vue";

export default {
    components: {
        Sidebar,
    },
    data() {
        return {
            role: {
                name: "",
            },
            editRoleId: null, // Store the ID of the role being edited
        };
    },
    computed: {
        ...mapGetters(["storeRoles"]),
        roles() {
            return this.storeRoles;
        },
    },
    methods: {
        newRole() {
                this.newRoles
    if (this.role.name.trim()) {
        // Push the new role object to the roles array
        this.roles.push({ ...this.role });
        // Optionally, update the Vuex store with the new roles array
        this.$store.dispatch("newRoles",this.role);

        // Clear the input field after adding the role
        this.role.name = "";
    }
},
        editRole(roleId) {
            this.editRoleId = roleId; // Set the role ID to edit
        },
        saveRole(role) {
            this.$store.dispatch("updateRoles", role); // Dispatch an action to update the role in the store
            this.editRoleId = null; // Clear the edit mode
        },
        deleteRole(roleId) {
            this.roles.filter((role) => {
                if (role.id === roleId) {
                    this.roles.splice(this.roles.indexOf(role), 1);
                }
            }); // Remove the role from the list

            this.$store.dispatch("deleteRole", roleId); // Dispatch an action to delete the role
        },
    },
    mounted() {
        this.$store.dispatch("getRoles"); // Fetch roles when the component is mounted
    },
};
</script>
