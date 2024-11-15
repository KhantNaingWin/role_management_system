<template>
    <div
        x-data="{ sidebarOpen: false }"
        class="flex h-screen bg-gray-100 font-roboto"
    >
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                <div
                    class="container flex mt-10 content-center justify-center mx-auto px-6 py-8"
                >
                    <div
                        class="flex justify-center grid-cols-1 lg:grid-cols-3 gap-6"
                    >
                        <div
                            v-if="authPermission?.includes('post_create')"
                            class="bg-white p-6 rounded-lg shadow-lg"
                        >
                            <v-alert
                                class="mb-2"
                                v-if="successMessage"
                                type="success"
                                dismissible
                                @input="successMessage = ''"
                            >
                                {{ successMessage }}
                            </v-alert>
                            <v-form @submit.prevent="createPostandEdit">
                                <v-row class="space-y-4">
                                    <v-col cols="12">
                                        <v-text-field
                                            v-model="formData.title"
                                            label="Post Title"
                                            outlined
                                            color="primary"
                                            placeholder="Enter post title"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-textarea
                                            v-model="formData.description"
                                            label="Post Description"
                                            outlined
                                            color="primary"
                                            rows="4"
                                            placeholder="Enter post description"
                                            required
                                        ></v-textarea>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-btn
                                            type="submit"
                                            color="primary"
                                            class="w-full"
                                            :loading="loading"
                                            :disabled="loading"
                                        >
                                            {{
                                                formData.id
                                                    ? "Update Post"
                                                    : "Create Post"
                                            }}
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Sidebar from "../Sidebar.vue";
import api from "../../api/api";

export default {
    name: "Postform",
    components: {
        Sidebar,
    },
    data() {
        return {
            formData: {
                id: null,
                title: "",
                description: "",
            },
            posts: [],
            totalItems: 0,
            loading: false,
            successMessage: "",
        };
    },
    computed: {
        ...mapGetters(["authPermission"]),
    },
    methods: {
        async createPostandEdit() {
            this.loading = true;
            try {
                if (this.formData.id) {
                    await this.$store.dispatch("updatePost", this.formData);
                    this.successMessage = "Post updated successfully!";
                } else {
                    await this.$store.dispatch("createPost", this.formData);
                    this.successMessage = "Post created successfully!";
                }
                this.resetForm();
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        loadPostForEditing(post) {
            this.formData = { ...post };
        },
        resetForm() {
            this.formData = {
                id: null,
                title: "",
                description: "",
            };
        },
        async fetchPostById(id) {
            try {
                const res = await api.get(`api/post/${id}/edit`);
                let post = res.data;
                this.loadPostForEditing(post);
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        // get id from param
        const id = this.$route.params.id;
        if (id) {
            this.fetchPostById(id);
        }

        this.$store.dispatch("adminAuthProfile");
    },
};
</script>
