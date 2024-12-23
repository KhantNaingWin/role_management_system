<template>
    <v-app>
        <div class="d-flex">
            <Sidebar class="h-screen" />

            <v-main class="flex-1">
                <v-container fluid>
                    <v-row justify="center" align="center">
                        <v-col cols="12" md="6">
                            <!-- Toast Notification -->
                            <v-snackbar
                                v-model="messageStatus"
                                color="green"
                                timeout="3000"
                                multi-line
                            >
                                <v-icon left>mdi-check-circle</v-icon>
                                {{ message }}
                                <template #action="{ attrs }">
                                    <v-btn
                                        text
                                        v-bind="attrs"
                                        @click="messageStatus = false"
                                    >
                                        Close
                                    </v-btn>
                                </template>
                            </v-snackbar>

                            <!-- Form for User Creation -->
                            <v-card class="mt-6">
                                <v-card-title>Create User</v-card-title>
                                <v-card-text>
                                    <v-form @submit.prevent="createNewUser">
                                        <v-text-field
                                            v-model="formData.name"
                                            label="Name"
                                            required
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="formData.email"
                                            label="Email"
                                            type="email"
                                            required
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="formData.password"
                                            label="Password"
                                            type="password"
                                            required
                                        ></v-text-field>

                                        <!-- <v-radio-group
                      v-model="formData.role"
                      label="Roles"
                      required
                    >
                      <v-radio
                        v-for="role in roles"
                        :key="role.id"
                        :label="role.name"
                        :value="role.id"
                      ></v-radio>
                    </v-radio-group> -->
                                        <v-select
                                            v-model="formData.role"
                                            :items="roles"
                                            item-title="name"
                                            item-value="id"
                                            label="Roles"
                                            outlined
                                            required
                                        ></v-select>

                                        <v-btn
                                            type="submit"
                                            color="primary"
                                            class="mt-4"
                                            :disabled="loading"
                                        >
                                            <v-progress-circular
                                                v-if="loading"
                                                indeterminate
                                                size="20"
                                                width="2"
                                                class="mr-2"
                                            ></v-progress-circular>
                                            Create User
                                        </v-btn>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </div>
    </v-app>
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
            loading: false,
        };
    },
    computed: {
        ...mapGetters(["allroles"]),
    },
    watch: {
        allroles() {
            this.roles = this.allroles?.roles;
        },
    },
    methods: {
        createNewUser() {
            this.loading = true;
            this.$store
                .dispatch("createUser", this.formData)
                .then(() => {
                    this.message = "User created successfully!";
                    this.messageStatus = true;
                    this.formData = { name: "", email: "", password: "" };
                })
                .catch((error) => {
                    console.error("Error creating user:", error);
                })
                .finally(() => {
                    this.loading = false; // Set loading to false regardless of success or error
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
