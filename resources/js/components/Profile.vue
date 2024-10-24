<template>

    <div  class="flex h-screen bg-gray-200 font-roboto">
        <div  class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>
                <Sidebar/>
            <div class="flex-1 flex flex-col overflow-hidden">

                <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div class="container mx-auto px-6 py-8">
                        <div class="mt-8">

        <div class="mt-6">


<div class="w-full mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div class="flex justify-end px-4 pt-4">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
            <span class="sr-only">Open dropdown</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>
        </button>
        <!-- Dropdown menu -->
        <div id="dropdown" class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2" aria-labelledby="dropdownButton">
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
            </li>
            <li>
                <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
            </li>
            </ul>
        </div>
    </div>
    <div class="flex flex-col items-center pb-10">
        <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="../../css/images.jpg" alt="Bonnie image"/>
        <div class="flex justify-center items-center">
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ profileData.user.name }}</h5>
        </div>
        <div class="flex justify-center items-center">
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ profileData.user.email }}</h5>
        </div>
        <div class="flex mt-4 md:mt-6">
            <a href="#" class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{{ profileData.user.roles[0].name }}</a>
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
import { mapGetters } from 'vuex';
import Sidebar from '../admin/Sidebar.vue';
    export default {
        components : {
            Sidebar
        },
        computed : {
            ...mapGetters(['profileData']) },
        mounted () {
            this.$store.dispatch('adminAuthProfile');
        },

    }
</script>

