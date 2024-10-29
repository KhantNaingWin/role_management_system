<template>
    <div x-data="{ sidebarOpen: false }" class="flex h-screen bg-gray-100 font-roboto">
        <div x-cloak class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                <div class="container mx-auto px-6 py-8">
                    <div class="mt-8">
                        <div>
                            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div v-if="authPermission?.includes('post_create')" class="bg-white p-6 rounded-lg shadow-lg">
                                    <form @submit.prevent="handleSubmit">
                                        <div class="space-y-4">
                                            <div>
                                                <label for="post_title" class="block mb-2 text-sm font-medium text-gray-700">Post Title</label>
                                                <input
                                                    type="text"
                                                    id="post_title"
                                                    v-model="formData.title"
                                                    class="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                                                    placeholder="Create post title"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label for="post_description" class="block mb-2 text-sm font-medium text-gray-700">Post Description</label>
                                                <textarea
                                                    id="post_description"
                                                    v-model="formData.description"
                                                    rows="4"
                                                    class="block p-3 w-full text-sm text-gray-700 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Create post description"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            class="mt-4 w-full text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition ease-in-out duration-300"
                                        >
                                            {{ editingPostId ? "Update" : "Create" }}
                                        </button>
                                    </form>
                                </div>
                                <div class="col-span-2 bg-white p-6 rounded-lg shadow-lg">
                                    <div class="mt-7 overflow-x-auto">
                                        <table  v-if="authPermission?.includes('post_read')" class="min-w-full bg-white border-collapse">
                                            <thead>
                                                <tr>
                                                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                                                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                                                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                                                    <th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="post in postData" :key="post.id" class="bg-white border-b hover:bg-gray-50 transition">
                                                    <td class="px-6 py-4 text-sm text-gray-700">
                                                        {{ post.title }}
                                                    </td>
                                                    <td class="px-6 py-4 text-sm text-gray-700">
                                                        {{ post.description }}
                                                    </td>
                                                    <td class="px-6 py-4 text-sm">
                                                        <img class="w-10 h-10 rounded-full" src="../../../css/images.jpg" alt="" />
                                                    </td>
                                                    <td class="px-6 py-4 space-x-3 text-sm">
                                                        <button v-if="authPermission?.includes('update_post')" @click="editPost(post)" class="text-green-600 hover:text-green-800 transition">
                                                            <i class="fa-regular fa-pen-to-square"></i>
                                                        </button>
                                                        <button  v-if="authPermission?.includes('delete_post')" @click="deletePost(post.id)" class="text-red-600 hover:text-red-800 transition">
                                                            <i class="fa-solid fa-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                            <div v-else class="flex justify-center items-center h-32">
                                                <p class="text-gray-500">No permissions found.</p>
                                            </div>
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
import { mapGetters } from "vuex";
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
            editingPostId: null,
        };
    },
    computed: {
        ...mapGetters(["storePostData","authPermission"]),
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
            await this.$store.dispatch("updatePost", { id: this.editingPostId, ...postData });
            await this.$store.dispatch("fetchPosts"); // Refetch data to update list

        } else {
            await this.$store.dispatch("createPost", postData);
            await this.$store.dispatch("fetchPosts"); // Refetch data to update list
        }
        this.resetForm();
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
        this.$store.dispatch('adminAuthProfile');
    },
};
</script>
