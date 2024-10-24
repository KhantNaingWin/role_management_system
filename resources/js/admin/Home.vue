<template>

    <div  class="flex h-screen bg-gray-200 font-roboto">
        <div  class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"></div>
                <Sidebar/>
            <div class="flex-1 flex flex-col overflow-hidden">

                <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div class="container mx-auto px-6 py-8">
                        <div class="mt-8">

        <div class="mt-6">
            <div>
                <button @click="createData" class=" bg-indigo-600 text-white px-5 p-2 my-2 rounded-md hover:bg-indigo-700">Add</button>
            </div>

            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table class="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- {{ userData }} -->
                            <tr
                            v-for="userlist in userData" :key="userlist.id"
                            >
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div class="flex items-center">

                                        <div class="ml-3">
                                            <p class="text-gray-900 whitespace-no-wrap">{{ userlist.name }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">{{ userlist.email }}</p>
                                </td>
                                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p class="text-gray-900 whitespace-no-wrap">{{ userlist.roles && userlist.roles.length > 0 ? userlist.roles[0].name : 'No role assigned' }}</p>
                                </td>
                                <td class="px-5 space-x-4 py-5 border-b border-gray-200 bg-white text-sm">
                                    <button @click="userEdit(userlist.id)"><i class="fa-regular fa-pen-to-square hover:text-green-500 "></i></button>
                                    <button @click="userDelete(userlist.id)"><i class="fa-solid fa-trash  hover:text-red-500"></i></button>
                                    <!-- <h4>{{ currentRole }}</h4> -->
                                </td>
                            </tr>

                        </tbody>
                    </table>
                    <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                        <span class="text-xs xs:text-sm text-gray-900">Showing 1 to 4 of 50 Entries</span>

                        <div class="inline-flex mt-2 xs:mt-0">
                            <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">Prev</button>
                            <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">Next</button>
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

<script src="./index.js"></script>

