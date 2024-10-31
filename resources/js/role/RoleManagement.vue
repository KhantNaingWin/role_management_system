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
        <div class="flex-1 flex flex-col overflow-auto p-6">
            <!-- Form Section -->
            <div class="mb-8">
                <form
                    @submit.prevent="newRole"
                    class="bg-white p-6 rounded-lg shadow-md"
                >
                    <h2 class="text-2xl font-semibold mb-4 text-gray-800">
                        Create New Role
                    </h2>
                    <div class="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Enter role name"
                            v-model="role.name"
                            class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        >
                            Create
                        </button>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div
                            v-for="permission in Permissions"
                            :key="permission.id"
                            class="flex items-center space-x-2"
                        >
                            <input
                                v-model="role.permissions"
                                type="checkbox"
                                :value="permission.name"
                                :id="permission.id"
                                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label :for="permission.id" class="text-gray-700">{{
                                permission.name
                            }}</label>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Role List Section -->
            <div class="flex-1 overflow-auto">
                <h3 class="text-2xl font-semibold mb-6 text-gray-800">
                    Role List
                </h3>
                <div class="space-y-4">
                    <div
                        v-for="role in roles"
                        :key="role.id"
                        class="flex items-center justify-between p-5 bg-white rounded-lg shadow-sm"
                    >
                        <div>
                            <span
                                v-if="editRoleId !== role.id"
                                class="text-lg font-medium text-gray-800"
                                >{{ role.name }}</span
                            >
                        </div>
                        <div class="flex space-x-4">
                            <button
                                @click="permission(role.id)"
                                class="text-green-600 hover:text-green-700 flex items-center"
                            >
                                <i class="fas fa-lock mr-2"></i> Permissions
                            </button>
                            <button
                                @click="editRole(role.id)"
                                class="text-blue-600 hover:text-blue-700 flex items-center"
                            >
                                <i class="fas fa-edit mr-2"></i> Edit
                            </button>
                            <button
                                @click="deleteRole(role.id)"
                                class="text-red-600 hover:text-red-700 flex items-center"
                            >
                                <i class="fas fa-trash-alt mr-2"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg my-1 shadow-md">
                    <h3 class="text-2xl font-semibold mb-4 text-gray-800">
                        Permissions List
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        <span
                            v-for="p in permissionslists"
                            :key="p.id"
                            class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                        >
                            {{ p.name }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters } from "vuex";
import Sidebar from "../admin/Sidebar.vue";
import api from "../api/api";

export default {
    components: {
        Sidebar,
    },
    data() {
        return {
            role: {
                name: "",
                permissions: [],
            },
            editRoleId: null,
            Permissions: [],
            rolepermission: [],
            permissionslists: [],
            editrole: [],
            roles: [],
        };
    },
    computed: {
        ...mapGetters(["storeRoles", "storePermissions"]),
    },
    watch: {
        storeRoles: {
            immediate: true,
            handler(newVal) {
                this.roles = newVal;
            },
        },
        storePermissions: {
            immediate: true,
            handler(newVal) {
                this.permissionslists = newVal;
            },
        },
    },
    methods: {
        newRole() {


    if (this.role.name.trim()) {
        // Use the Vuex store to add the new role
        this.$store.dispatch("newRoles", { ...this.role }).then(() => {
            // Clear the form after adding the new role
            this.role.name = "";
            this.role.permissions = [];
        });
    }
},
        async permission(roleid) {
            await this.$store.dispatch("permissionlists", roleid);
            await this.$store.dispatch("getRoles");
        },
        async editRole(roleId) {
            this.$router.push(`/edit/role/${roleId}`);
        },
        saveRole(role) {
            this.editRoleId = null;
        },
        deleteRole(roleId) {
            this.roles = this.roles.filter((role) => role.id !== roleId);
            this.$store.dispatch("deleteRole", roleId);
        },
        async fetchData() {
            try {
                const response = await api.get("/api/permission");
                this.Permissions = response.data;
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.fetchData();
        this.$store.dispatch("getRoles");
    },
};
</script>
