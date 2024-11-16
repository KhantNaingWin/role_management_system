<template>
    <v-app>
        <div class="flex h-screen bg-gray-100 font-roboto">
            <Sidebar />

            <div class="flex-1 p-8 overflow-hidden">
                <v-card class="max-w-2xl mx-auto p-6 rounded-lg shadow-lg">
                    <v-card-title class="text-2xl font-semibold text-gray-800">
                        Edit Role
                    </v-card-title>
                    <v-form @submit.prevent="saveRole">
                        <v-text-field
                            v-model="editData.name"
                            label="Role Name"
                            placeholder="Enter role name"
                            outlined
                            class="mb-4"
                        />
                        <div class="mb-6">
                            <h2 class="block text-gray-700 text-lg font-lg ms-6 mb-2">
                                Permissions
                            </h2>
                            <v-container class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                <v-checkbox
                                    v-for="p in permissions"
                                    :key="p.id"
                                    v-model="editData.permissions"
                                    :label="p.name"
                                    :value="p.name"
                                    :id="p.id"
                                    class="flex items-center"
                                />
                            </v-container>
                        </div>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn
                                type="submit"
                                color="blue"
                                class="hover:bg-blue-700"
                            >
                                Save Changes
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>

                <!-- Loading Indicator -->
                <v-progress-circular
                    v-if="loading"
                    indeterminate
                    color="blue"
                    class="flex justify-center items-center mt-4"
                    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1000;"
                ></v-progress-circular>

                <!-- Alert message -->
                <v-snackbar
                    v-model="showAlert"
                    :timeout="3000"
                    color="green"
                >
                    {{ successMessage }}
                    <template v-slot:action="{ attrs }">
                        <v-btn
                            icon
                            v-bind="attrs"
                            @click="showAlert = false"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </template>
                </v-snackbar>
            </div>
        </div>
    </v-app>
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
            loading: false,
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
            this.loading = true;
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
                    console.error("Error saving role:", error);
                })
                .finally(() => {
                    this.loading = false;
                });

                this.$store.dispatch("adminAuthProfile");
        },
        async fetchData() {
            this.loading = true;
            this.userId = this.$route.params.id;
            await api.get(`/api/role/${this.userId}/edit`).then((res) => {
                this.editData.name = res.data.name;
                this.editData.permissions = res.data.selected_permission_list;
                this.loading = false;
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                this.loading = false;
                })
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
