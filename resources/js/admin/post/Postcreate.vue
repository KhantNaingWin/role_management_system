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
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Post title</label>
            <input type="text" id="first_name" v-model="this.formData.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Create post title" required />
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
                            <tr
                            >
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div class="flex items-center">

                                        <div class="ml-3">
                                            <p class="text-gray-900 whitespace-no-wrap">ko</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">mail@.com</p>
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
                    name : "",
                    description : "",
                    file : null
                }
            }
        },
        computed: {
        ...mapGetters(["storeUserData"]),
        },
        methods: {
            handleFileChange(event) {
            const file = event.target.files[0];
            this.formData.file = file; // Store the file in formData
        },
     async   handleSubmit(){
            const formData = new FormData();
            formData.append('name', this.formData.name);
            formData.append('description', this.formData.description);
            formData.append('file', this.formData.file);
           await api.post('/api/posts', formData)
                .then((response) => {
                    this.$store.dispatch("getUserData", response.data);
                   console.log(response.data);
                   console.log(this.storeUserData);

                })
                .catch((error) => {
                    console.error(error);
                });

            console.log('Form data submitted:', this.formData);

        }
        },
    }
</script>





