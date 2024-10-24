<template>
    <div x-data="{ sidebarOpen: false }" class="flex h-screen bg-gray-200 font-roboto">
        <div x-cloak class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div class="container mx-auto px-6 py-8">
                    <div class="mt-8">
                        <div>
                            <div class="grid grid-cols-3 gap-4">
                                <div>
                                    <form @submit.prevent="handleSubmit">
                                        <div class="gap-6 mb-5 space-y-3">
                                            <div>
                                                <label for="post_title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Title</label>
                                                <input
                                                    type="text"
                                                    id="post_title"
                                                    v-model="formData.title"
                                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Create post title"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label for="post_description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Description</label>
                                                <textarea
                                                    id="post_description"
                                                    v-model="formData.description"
                                                    rows="4"
                                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Create post description"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            {{ editingPostId ? "Update" : "Create" }}
                                        </button>
                                    </form>
                                </div>
                                <div class="col-span-2">
                                    <div class="mt-7">
                                        <table class="min-w-full leading-normal">
                                            <thead>
                                                <tr>
                                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="post in postData" :key="post.id">
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <div class="flex items-center">
                                                            <div class="ml-3">
                                                                <p class="text-gray-900 whitespace-no-wrap">{{ post.title }}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <p class="text-gray-900 whitespace-no-wrap">{{ post.description }}</p>
                                                    </td>
                                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <img class="w-10 h-10 rounded-full" src="../../../css/images.jpg" alt="" />
                                                    </td>
                                                    <td class="px-5 space-x-4 py-5 border-b border-gray-200 bg-white text-sm">
                                                        <button @click="editPost(post)">
                                                            <i class="fa-regular fa-pen-to-square hover:text-green-500"></i>
                                                        </button>
                                                        <button @click="deletePost(post.id)">
                                                            <i class="fa-solid fa-trash hover:text-red-500"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
import { mapActions, mapGetters } from "vuex";
import Sidebar from "../Sidebar.vue";

export default {
    name: "Postcreate",
    components: {
        Sidebar,
    },
    data() {
        return {
            formData: {
                title: "",
                description: "",
            },
            posts : [],
            editingPostId: null, // Track the ID of the post being edited
        };
    },
    computed: {
        ...mapGetters(["storeUserData", "storePostData", "storeToken"]),
        postData() {
            return this.storePostData; // Use the store getter to access postData
        },

    },
    methods: {
        async handleSubmit() {
            const postData = {
                title: this.formData.title,
                description: this.formData.description,
            };

            try {
                if (this.editingPostId) {


                    await this.$store.dispatch("updatePost", { id: this.editingPostId, ...postData }); // Dispatch an update action
                } else {
                    this.postData.push(postData)

                    await this.$store.dispatch("createPost", postData); // Dispatch create action
                }
                this.resetForm(); // Reset form after submission
            } catch (error) {
                console.log(error);
            }
        },
        resetForm() {
            this.formData.title = "";
            this.formData.description = "";
            this.editingPostId = null; // Reset editingPostId
        },
        editPost(post) {
            // Set the editing post's data into the form
            this.formData.title = post.title;
            this.formData.description = post.description;
            this.editingPostId = post.id; // Set the ID of the post being edited
        },
        async deletePost(postId) {
            await this.$store.dispatch("deletePost", postId);
        },
    },
    mounted() {

        this.$store.dispatch("fetchPosts");
        if (this.storeToken == null) {
            this.$router.push("/login");
        }
    },
};
</script>
