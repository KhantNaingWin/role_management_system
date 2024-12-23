<template>
    <div
        x-data="{ sidebarOpen: false }"
        class="flex h-screen bg-gray-100 font-roboto"
    >
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                <div class="container mx-auto px-6 py-8">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div
                            class="bg-white p-6 shadow-lg col-span-1 lg:col-span-3"
                        >
                            <v-data-table-server
                                :headers="headers"
                                :items-length="totalItems"
                                :items="roles"
                                :loading="loading"
                                @update:options="fetchRoles"
                            >
                                <template v-slot:top>
                                    <v-toolbar flat>
                                        <v-toolbar-title
                                            >Role List</v-toolbar-title
                                        >
                                        <v-spacer></v-spacer>
                                        <v-btn @click="addRole" color="primary">
                                            <v-icon left>mdi-plus</v-icon>Add
                                            Role
                                        </v-btn>
                                    </v-toolbar>
                                </template>

                                <template v-slot:item="{ item }">
                                    <tr>
                                        <td>{{ item.name }}</td>
                                        <td>
                                            <v-chip-group column>
                                                <v-chip
                                                    v-for="permission in item.permissions"
                                                    :key="permission.id"
                                                    class="ma-1"
                                                    color="primary"
                                                    text-color="white"
                                                >
                                                    {{ permission.name }}
                                                </v-chip>
                                            </v-chip-group>
                                        </td>
                                        <td class="">
                                            <!-- <v-btn @click="editRole(item.id)" text>
                                                <v-icon class="text-green" left>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn @click="deleteRole(item.id)" text>
                                                <v-icon class="text-red" left>mdi-delete</v-icon>
                                            </v-btn> -->
                                            <v-btn
                                                @click="editRole(item.id)"
                                                elevation="0"
                                            >
                                                <v-icon class="text-green" left
                                                    >mdi-pencil</v-icon
                                                >
                                            </v-btn>
                                            <v-btn
                                                @click="deleteRole(item.id)"
                                                elevation="0"
                                            >
                                                <v-icon class="text-red" left
                                                    >mdi-delete</v-icon
                                                >
                                            </v-btn>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table-server>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Sidebar from "../admin/Sidebar.vue";

export default {
    components: {
        Sidebar,
    },
    data() {
        return {
            roles: [],
            totalItems: 0,
            options: {
                page: 1,
                itemsPerPage: 10,
            },
            loading: false,
            headers: [
                { text: "Role Name", value: "name" },
                { text: "Permissions", value: "permissions", sortable: false },
                { text: "Actions", value: "actions", sortable: false },
            ],
        };
    },
    computed: {
        ...mapGetters(["storeRoles"]),
    },
    watch: {
        storeRoles(newValue) {
            this.roles = newValue.roles?.data.map((role) => ({
                ...role,
                permissions: role.permissions || [],
            }));
            this.totalItems = newValue.roles?.total || 0;
        },
    },
    methods: {
        async fetchRoles(options) {
            this.loading = true;
            await this.$store.dispatch("fetchRoles", options);
            this.loading = false;
        },
        addRole() {
            this.$router.push("/role/create");
        },
        async editRole(roleId) {
            this.$router.push(`/edit/role/${roleId}`);
        },
        async deleteRole(roleId) {
            await this.$store.dispatch("deleteRole", roleId);
            this.fetchRoles({ page: this.options.page, itemsPerPage: this.options.itemsPerPage });
        },
    },
};
</script>
