<template>

    <div x-data="{ sidebarOpen: false }" class="flex h-screen bg-gray-200 font-roboto">
        <div x-cloak class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>
                <Sidebar/>
            <div class="flex-1 flex flex-col overflow-hidden">

                <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div class="container mx-auto px-6 py-8">
                        <div class="mt-8">

        <div class="">

            <!-- input box  -->

<div class="grid grid-cols-3 gap-4">
    <div>
    <form  @submit.prevent="handleSubmit">
    <div class="gap-6 mb-5 space-y-3">
        <!-- <div id="alert-border-2" class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
    <div class="ms-3 text-sm font-medium">
      A simple danger alert with an <a href="#" class="font-semibold underline hover:no-underline">example link</a>. Give it a click if you like.
    </div>
    <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"  data-dismiss-target="#alert-border-2" aria-label="Close">
      <span class="sr-only">Dismiss</span>
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
      </svg>
    </button>
</div> -->
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post title</label>
            <input type="text" id="first_name" v-model="this.formData.title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Create post title" required />
        </div>
        <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post description</label>
            <textarea id="message" v-model="this.formData.description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Create post description"></textarea>
        </div>
        <div>
            <label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post Image</label>
            <input @change="handleFileChange" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
        </div>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
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
                            <tr  v-for="post in postData" :key="post.id"
                            >
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
                                    <p class="text-gray-900 whitespace-no-wrap">photo</p>
                                </td>
                                <td class="px-5 space-x-4 py-5 border-b border-gray-200 bg-white text-sm">
                                    <button ><i class="fa-regular fa-pen-to-square hover:text-green-500 "></i></button>
                                    <button ><i class="fa-solid fa-trash  hover:text-red-500"></i></button>
                                    <!-- <h4>{{ currentRole }}</h4> -->
                                </td>
                            </tr>

                        </tbody>
                    </table>
   </div>
</div>
</div>
<!-- inpur end  -->
        </div>
    </div>
                    </div>
                </main>
            </div>
        </div>
</template>
<script>
import { mapGetters } from 'vuex/dist/vuex.cjs.js';
import api from '../../api/api';
import Sidebar from '../Sidebar.vue';

    export default {
        name : "Postcreate",
        components : {
            Sidebar
        },
        data() {
            return {
                formData: {
                    title : "",
                    description : "",
                    file : null,
                },
                postData : {}
            }
        },
        computed: {
        ...mapGetters(["storeUserData","storePostData","storeToken"]),
        },
        methods: {
            handleFileChange(event) {
            const file = event.target.files[0];
            this.formData.file = file; // Store the file in formData
        },
     async   handleSubmit(){
            const formData = new FormData();
            formData.append('title', this.formData.title);
            formData.append('description', this.formData.description);
            formData.append('file', this.formData.file);

          try {
             const response = await api.post('/api/posts',formData)
             this.$store.dispatch("createPost", response.data);
             this.postData = this.storePostData

             console.log(this.postData);

            return response.data;

          } catch (error) {
            console.log(error);

            return error;
          }


        },

        },
        mounted() {

         api.get('/api/allposts').then(res => {
            this.$store.dispatch("allPosts", res.data);
            this.postData = this.storePostData.posts.data

         })


        if (this.storeToken != null) {
            this.loginStatus = true;
        } else {
            this.loginStatus = false;
            this.$router.push("/login");
        }
    },
    }
</script>





