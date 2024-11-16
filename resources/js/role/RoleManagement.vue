<!-- <template>
  <v-app>
    <div class="flex h-screen ">
      <Sidebar class="h-screen" />

      <v-container fluid class="pa-6 h-screen">
        <v-row>
          <v-col cols="12" md="8">
            <v-data-table
              :headers="headers"
              :items="roles"
              :items-length="totalItems"
              :loading="loading"
              @update:options="fetchRoles"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Role List</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn @click="addRole" color="primary">
                    <v-icon left>mdi-plus</v-icon>Add Role
                  </v-btn>
                </v-toolbar>
              </template>

              <template v-slot:item="{ item }">
                <tr>
                  <td>{{ item.name }}</td>
                  <td class="space-x-4">
                    <v-btn @click="editRole(item.id)" >
                      <v-icon left>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="deleteRole(item.id)">
                      <v-icon left>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template> -->
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
                            class="bg-white p-6 rounded-lg shadow-lg col-span-1 lg:col-span-3"
                        >
                            <v-progress-circular
                                v-if="loading"
                                indeterminate
                                color="primary"
                                class="mx-auto"
                            ></v-progress-circular>
                            <div
                                v-else-if="totalItems === 0"
                                class="text-center py-4"
                            >
                                <p>No data available.</p>
                            </div>
                            <v-data-table
                                :headers="headers"
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
                                        <td class="space-x-4">
                                            <v-btn @click="editRole(item.id)">
                                                <v-icon left>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn @click="deleteRole(item.id)">
                                                <v-icon left>mdi-delete</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
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
            options : {
                page: 1,
                itemsPerPage: 10,
            },
            loading: false,
            headers: [
                { title: "Role Name", value: "name" },
                { title: "Actions", value: "actions", sortable: false },
            ],
        };
    },
    computed: {
        ...mapGetters(["storeRoles"]),
    },
    watch: {
        storeRoles(newValue) {
            this.roles = newValue?.data;
            // this.totalItems = newValue?.total;
            // console.log(this.totalItems);

                    },
    },
    methods: {
        async fetchRoles(options) {
            this.loading = true;
            const response = await this.$store.dispatch("fetchRoles",options);
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
            this.fetchRoles();
        },
    },
};
</script>
