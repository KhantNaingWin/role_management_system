<template>
    <div class="flex h-screen bg-gradient-to-br from-gray-100 to-gray-300 font-roboto">
        <div
            class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
        ></div>
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-transparent">
                <div class="container mx-auto px-6 py-8">
                    <div class="mt-8">
                        <!-- Success Alert -->
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
                                <button
                                    @click="createData"
                                    v-if="permissions?.includes('create')"
                                    class="bg-indigo-600 text-white px-5 py-2 my-2 rounded-md shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
                                >
                                    Add
                                </button>
                            </div>

                            <div
                                class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"
                            >
                                <div
                                    class="inline-block min-w-full shadow-lg rounded-lg overflow-hidden"
                                >
                                    <table
                                    v-if="permissions?.includes('read')"
                                    class="min-w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th
                                                    class="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    class="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    Email
                                                </th>
                                                <th
                                                    class="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    Role
                                                </th>
                                                <th
                                                    class="px-5 py-3 border-b-2 border-gray-300 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                ></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="userlist in userlists"
                                                :key="userlist.id"
                                                class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
                                            >
                                                <td
                                                    class="px-5 py-5 border-b border-gray-300 bg-white text-sm"
                                                >
                                                    <div class="flex items-center">
                                                        <div class="ml-3">
                                                            <p
                                                                class="text-gray-900 whitespace-no-wrap"
                                                            >
                                                                {{
                                                                    userlist.name
                                                                }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td
                                                    class="px-5 py-5 border-b border-gray-300 bg-white text-sm"
                                                >
                                                    <p
                                                        class="text-gray-900 whitespace-no-wrap"
                                                    >
                                                        {{ userlist.email }}
                                                    </p>
                                                </td>
                                                <td
                                                    class="px-5 py-5 border-b border-gray-300 bg-white text-sm"
                                                >
                                                    <p
                                                        class="text-gray-900 whitespace-no-wrap"
                                                    >
                                                        {{
                                                            userlist.roles &&
                                                            userlist.roles.length
                                                                ? userlist.roles[0].name
                                                                : "No role assigned"
                                                        }}
                                                    </p>
                                                </td>
                                                <td
                                                    class="px-5 space-x-4 py-5 border-b border-gray-300 bg-white text-sm"
                                                >
                                                    <button
                                                    v-if="permissions?.includes('update')"
                                                        @click="userEdit(userlist.id)"
                                                        class="text-gray-500 hover:text-lime-500 transition-colors"
                                                    >
                                                        <i
                                                            class="fa-regular fa-pen-to-square"
                                                        ></i>
                                                    </button>
                                                    <button
                                                    v-if="permissions?.includes('delete')"
                                                        @click="userDelete(userlist.id)"
                                                        class="text-gray-500 hover:text-red-500 transition-colors"
                                                    >
                                                        <i
                                                            class="fa-solid fa-trash"
                                                        ></i>
                                                    </button>
                                                    <button
                                                    v-if="currentRole?currentRole[0]?.name === 'admin' :''"
                                                        @click="showRoleSelect(userlist.id)"
                                                        class="text-gray-500 hover:text-blue-700 transition-colors"
                                                    >
                                                        <i class="fas fa-user-edit"></i>
                                                    </button>
                                                    <div
                                                        v-if="userlist.id === editingRoleId"
                                                        class="inline-block relative"
                                                    >
                                                        <select
                                                        v-if="currentRole?currentRole[0]?.name === 'admin' :''"
                                                            v-model="selectedRole"
                                                            @change="changeUserRole(userlist.id, selectedRole)"
                                                            class="block w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500"
                                                        >
                                                            <option disabled value="">
                                                                Select Role
                                                            </option>
                                                            <option v-for="role in roles" :key="role.id" :value="role.id">
                                                                {{ role.name }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div
                                        class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between"
                                    >
                                        <span
                                            class="text-xs xs:text-sm text-gray-700"
                                            >Showing 1 to 4 of 50 Entries</span
                                        >
                                        <div class="inline-flex mt-2 xs:mt-0">
                                            <button
                                                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l transition-colors"
                                            >
                                                Prev
                                            </button>
                                            <button
                                                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r transition-colors"
                                            >
                                                Next
                                            </button>
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
