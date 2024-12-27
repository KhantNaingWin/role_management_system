<!-- <template>
    <div
        class="flex h-screen bg-gradient-to-br from-gray-100 to-gray-300 font-roboto"
    >
        <div
            class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
        ></div>
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <main
                class="flex-1 overflow-x-hidden overflow-y-auto bg-transparent"
            >
                <div class="container mx-auto px-6 py-8">
                    <div class="mt-8">
                        <div v-if="successMessage" class="mt-4">
                            <div
                                class="flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 shadow-md"
                                role="alert"
                            >
                                <svg
                                    class="w-5 h-5 inline-flex mr-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M8.257 3.099c.366-1.099 1.942-1.099 2.308 0l5.196 15.5c.366 1.099-1.072 2-2.308 1.375L10 16.202l-3.453 3.772C5.122 20.5 3.636 19.601 4 18.5l5.196-15.5z"
                                    />
                                </svg>
                                <div>{{ successMessage }}</div>
                            </div>
                        </div>
                        <div class="mt-6">
                            <div>
                                <v-btn
                                    @click="createData"
                                    v-if="permissions?.includes('create')"
                                    class="bg-blue"
                                >
                                    Add
                                </v-btn>
                            </div>

                            <div
                                class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"
                            >
                                <div
                                    class="inline-block min-w-full shadow-lg rounded-lg overflow-hidden"
                                >
                                    <div>
                                        <v-data-table-server
                                            :items="userlists?.data"
                                            :headers="headers"
                                            :items-length="totalItems"
                                            :loading="loading"
                                            @update:options="fetchData"
                                        >
                                            <template v-slot:body="{ items }">
                                                <tr
                                                    v-for="userlist in items"
                                                    :key="userlist.id"
                                                >
                                                    <td>{{ userlist.name }}</td>
                                                    <td>
                                                        {{ userlist.email }}
                                                    </td>
                                                    <td>
                                                        {{
                                                            userlist.roles &&
                                                            userlist.roles
                                                                .length
                                                                ? userlist
                                                                      .roles[0]
                                                                      .name
                                                                : "No role assigned"
                                                        }}
                                                    </td>
                                                    <td class="text-center">
                                                        <v-btn
                                                        elevation="0"
                                                            icon
                                                            v-if="
                                                                permissions?.includes(
                                                                    'update'
                                                                )
                                                            "
                                                            @click="
                                                                userEdit(
                                                                    userlist.id
                                                                )
                                                            "
                                                        >
                                                            <v-icon
                                                            elevation="0"
                                                                small
                                                                class="text-green"
                                                                >mdi-pencil</v-icon
                                                            >
                                                        </v-btn>
                                                        <v-btn
                                                        elevation="0"
                                                            icon
                                                            v-if="
                                                                permissions?.includes(
                                                                    'delete'
                                                                )
                                                            "
                                                            @click="
                                                                userDelete(
                                                                    userlist.id
                                                                )
                                                            "
                                                        >
                                                            <v-icon
                                                                small
                                                                class="text-red"
                                                                >mdi-delete</v-icon
                                                            >
                                                        </v-btn>
                                                        <v-btn
                                                            elevation="0"
                                                            icon
                                                            v-if="
                                                                currentRole?.[0]
                                                                    ?.name ===
                                                                'admin'
                                                            "
                                                            @click="
                                                                showRoleSelect(
                                                                    userlist.id
                                                                )
                                                            "
                                                        >
                                                            <v-icon
                                                                small
                                                                >mdi-account-edit</v-icon
                                                            >
                                                        </v-btn>
                                                        <div
                                                            v-if="
                                                                userlist.id ===
                                                                editingRoleId
                                                            "
                                                            class="inline-block relative"
                                                        >
                                                            <v-select
                                                                v-if="
                                                                    currentRole?.[0]
                                                                        ?.name ===
                                                                    'admin'
                                                                "
                                                                v-model="
                                                                    selectedRole
                                                                "
                                                                :items="roles"
                                                                item-title="name"
                                                                item-value="id"
                                                                label="Select Role"
                                                                 @update:modelValue="value => changeUserRole(value, userlist.id)"
                                                                dense
                                                                variant="outlined"
                                                            ></v-select>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </template>
                                        </v-data-table-server>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template> -->
<template>
    <div
        x-data="{ sidebarOpen: false }"
        class="flex h-screen bg-gray-100 font-roboto"
    >
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                <div class="container mx-auto px-6 py-8">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div
                            class="bg-white p-6 shadow-lg col-span-1 lg:col-span-3"
                        >
                                <v-toolbar flat>
                                    <v-toolbar-title
                                        >Post Lists</v-toolbar-title
                                    >
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" @click="postcreate">
                                        <v-icon left>mdi-plus</v-icon>Create
                                        Post
                                    </v-btn>
                                </v-toolbar>
                                <v-text-field
                                    v-model="search"
                                    label="Search"
                                    clearable
                                    @input="
                                        fetchData({
                                            page: 1,
                                            itemsPerPage: itemsPerPage,
                                            search,
                                        })
                                    "
                                    @click:clear="handleClear"
                                    class="my-3"
                                ></v-text-field>
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
                                <v-data-table-server
                                    v-else
                                    :headers="headers"
                                    :items="items?.data"
                                    :items-length="totalItems"
                                    :loading="loading"
                                    @update:options="fetchData"
                                    class="elevation-1"
                                >
                                    <template v-slot:item="{ item }">
                                        <tr>
                                            <td>{{ item.title }}</td>
                                            <td>{{ item.description }}</td>
                                            <td class="text-center">
                                                <v-btn
                                                    elevation="0"
                                                    v-if="
                                                        authPermission?.includes(
                                                            'update_post'
                                                        )
                                                    "
                                                    icon
                                                    @click="editItem(item)"
                                                >
                                                    <v-icon
                                                        small
                                                        class="text-green"
                                                        >mdi-pencil</v-icon
                                                    >
                                                </v-btn>
                                                <v-btn
                                                    elevation="0"
                                                    icon
                                                    v-if="
                                                        authPermission?.includes(
                                                            'delete_post'
                                                        )
                                                    "
                                                    @click="deleteItem(item.id)"
                                                >
                                                    <v-icon
                                                        small
                                                        class="text-red"
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
            </main> -->
            <main
                class="flex-1 overflow-x-hidden overflow-y-auto bg-transparent"
            >
                <div class="container mx-auto px-6 py-8">
                    <div class="mt-8">
                        <div v-if="successMessage" class="mt-4">
                            <div
                                class="flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 shadow-md"
                                role="alert"
                            >
                                <svg
                                    class="w-5 h-5 inline-flex mr-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M8.257 3.099c.366-1.099 1.942-1.099 2.308 0l5.196 15.5c.366 1.099-1.072 2-2.308 1.375L10 16.202l-3.453 3.772C5.122 20.5 3.636 19.601 4 18.5l5.196-15.5z"
                                    />
                                </svg>
                                <div>{{ successMessage }}</div>
                            </div>
                        </div>
                        <div class="mt-6">
                            <div>
                                <v-btn
                                    @click="createData"
                                    v-if="permissions?.includes('create')"
                                    class="bg-blue"
                                >
                                    Add
                                </v-btn>
                            </div>

                            <div
                                class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"
                            >
                                <div
                                    class="inline-block min-w-full shadow-lg rounded-lg overflow-hidden"
                                >
                                    <div>
                                        <v-data-table-server
                                            :items="userlists?.data"
                                            :headers="headers"
                                            :items-length="totalItems"
                                            :loading="loading"
                                            @update:options="fetchData"
                                        >
                                            <template v-slot:body="{ items }">
                                                <tr
                                                    v-for="userlist in items"
                                                    :key="userlist.id"
                                                >
                                                    <td>{{ userlist.name }}</td>
                                                    <td>
                                                        {{ userlist.email }}
                                                    </td>
                                                    <td>
                                                        {{
                                                            userlist.roles &&
                                                            userlist.roles
                                                                .length
                                                                ? userlist
                                                                      .roles[0]
                                                                      .name
                                                                : "No role assigned"
                                                        }}
                                                    </td>
                                                    <td class="text-center">
                                                        <v-btn
                                                        elevation="0"
                                                            icon
                                                            v-if="
                                                                permissions?.includes(
                                                                    'update'
                                                                )
                                                            "
                                                            @click="
                                                                userEdit(
                                                                    userlist.id
                                                                )
                                                            "
                                                        >
                                                            <v-icon
                                                            elevation="0"
                                                                small
                                                                class="text-green"
                                                                >mdi-pencil</v-icon
                                                            >
                                                        </v-btn>
                                                        <v-btn
                                                        elevation="0"
                                                            icon
                                                            v-if="
                                                                permissions?.includes(
                                                                    'delete'
                                                                )
                                                            "
                                                            @click="
                                                                userDelete(
                                                                    userlist.id
                                                                )
                                                            "
                                                        >
                                                            <v-icon
                                                                small
                                                                class="text-red"
                                                                >mdi-delete</v-icon
                                                            >
                                                        </v-btn>
                                                        <v-btn
                                                            elevation="0"
                                                            icon
                                                            v-if="
                                                                currentRole?.[0]
                                                                    ?.name ===
                                                                'admin'
                                                            "
                                                            @click="
                                                                showRoleSelect(
                                                                    userlist.id
                                                                )
                                                            "
                                                        >
                                                            <v-icon
                                                                small
                                                                >mdi-account-edit</v-icon
                                                            >
                                                        </v-btn>
                                                        <div
                                                            v-if="
                                                                userlist.id ===
                                                                editingRoleId
                                                            "
                                                            class="inline-block relative"
                                                        >
                                                            <v-select
                                                                v-if="
                                                                    currentRole?.[0]
                                                                        ?.name ===
                                                                    'admin'
                                                                "
                                                                v-model="
                                                                    selectedRole
                                                                "
                                                                :items="roles"
                                                                item-title="name"
                                                                item-value="id"
                                                                label="Select Role"
                                                                 @update:modelValue="value => changeUserRole(value, userlist.id)"
                                                                dense
                                                                variant="outlined"
                                                            ></v-select>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </template>
                                        </v-data-table-server>
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
import Sidebar from "./Sidebar.vue";
import { mapGetters } from "vuex";
import "material-icons/iconfont/material-icons.css";

export default {
    name: "Home",
    components: {
        Sidebar,
    },
    data() {
        return {
            loginStatus: false,
            currentRole: null,
            userlists: null,
            formData: {
                name: "",
                email: "",
                password: "",
            },
            headers: [
                { title: "Name", value: "name" },
                { title: "Email", value: "email" },
                { title: "Role", value: "role" },
                { title: "", value: "" },
            ],
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 0,
            search: "",
            loading: false,
            roles: null,
            editingRoleId: null,
            selectedRole: "",
            successMessage: "",
            permissions: null,
            perPage: 6,
            page: 0,
        };
    },
    computed: {
        ...mapGetters([
            "storeUserData",
            "allroles",
            "authPermission",
            "authRole",
        ]),
    },
    watch: {
        storeUserData(userData) {
            this.userlists = userData;
            this.totalItems = userData?.total
        },
        allroles(allRoles) {
            this.roles = allRoles?.roles;
        },
        authPermission(permissions) {
            this.permissions = permissions;
        },
        authRole(role) {
            this.currentRole = role;
        },
    },
    methods: {
        showRoleSelect(userId) {
            this.editingRoleId = userId;
        },
        async changeUserRole(selectedRole, userId) {
            try {
                await this.$store.dispatch("updateUserRole", {
                    userId,
                    selectedRole,
                });
                this.successMessage = "Role changed successfully!";
                this.editingRoleId = null;

                setTimeout(() => {
                    this.successMessage = "";
                }, 3000);

                this.fetchData({ page: 1, itemsPerPage: 10 });
            } catch (error) {
                console.error("Failed to change user role:", error);
                alert("Failed to change user role.");
            }
        },
        async fetchData({ page, itemsPerPage }) {
            this.loading = true;
            await this.$store.dispatch("getUserData", {
                page: page,
                per_page: itemsPerPage,
            });
            this.loading = false;
            await this.$store.dispatch("getRoles");
            this.$store.dispatch("adminAuthProfile");
        },
        createData() {
            this.$router.push("/user/create");
        },
        userEdit(userID) {
            this.$router.push(`/admin/account/edit/${userID}`);
        },
        async userDelete(userID) {
            try {
                await this.$store.dispatch("deleteUser", userID);
               this.fetchData({ page: 1, itemsPerPage: 10 });
            } catch (error) {
                console.error("Failed to delete user:", error);
            }
        },
        logout() {
            this.$store.dispatch("logout");
            this.$router.push("/login");
            this.userlists = null;
            this.roles = null;
        },
    },
};
</script>
