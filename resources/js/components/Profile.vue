<template>
    <div class="flex h-screen bg-gray-100 font-roboto">
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <main class="flex-1 overflow-x-hidden overflow-y-auto">
                <div class="container mx-auto px-6 py-8">
                    <div class="flex justify-center mt-6">
                        <div class="w-full max-w-sm bg-white border border-gray-300 rounded-xl shadow-lg">
                            <div class="relative flex justify-end px-4 pt-4">
                                <button
                                    id="dropdownButton"
                                    @click="toggleDropdown"
                                    class="text-gray-500 hover:text-gray-700 transition"
                                >
                                    <span class="sr-only">Open dropdown</span>
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6 10a2 2 0 110-4 2 2 0 010 4zm4 0a2 2 0 110-4 2 2 0 010 4zm4 0a2 2 0 110-4 2 2 0 010 4z" />
                                    </svg>
                                </button>
                                <div
                                    id="dropdown"
                                    v-if="isDropdownOpen"
                                    class="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-20"
                                >
                                    <ul class="py-2">
                                        <li>
                                            <a href="#" @click.prevent="enterEditMode" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Edit</a>
                                        </li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Password</a>
                                        </li>
                                        <li>
                                            <a href="#" class="block px-4 py-2 text-red-600 hover:bg-red-100">Delete</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="flex flex-col items-center pb-6">
                                <img class="w-28 h-28 mb-4 rounded-full shadow-lg border-4 border-gray-300" src="../../css/images.jpg" alt="Profile Image"/>
                                <div class="text-center">
                                    <h5 class="text-xl font-semibold text-gray-800 mb-1">{{ profile ? profile.name : "Loading..." }}</h5>
                                    <p class="text-sm text-gray-600">{{ profile ? profile.email : "Loading..." }}</p>
                                    <div class="mt-3">
                                        <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-600">{{ profile ? profile.roles[0].name : "Loading..." }}</span>
                                    </div>
                                </div>
                                <div v-if="isEditMode" class="w-full px-4 py-2">
                                    <input
                                        v-model="editProfile.name"
                                        type="text"
                                        placeholder="Enter your name"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                    <input
                                        v-model="editProfile.email"
                                        type="email"
                                        placeholder="Enter your email"
                                        class="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                    <div class="flex mt-4 space-x-3">
                                        <button @click="saveProfile" class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">Save</button>
                                        <button @click="cancelEdit" class="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition">Cancel</button>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="flex mt-6 space-x-3">
                                        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">Message</button>
                                        <button class="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition">Follow</button>
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
    components: {
        Sidebar
    },
    data() {
        return {
            profile: null,
            isEditMode: false,
            isDropdownOpen: false,
            editProfile: {
                name: '',
                email: '',
            },
        };
    },
    computed: {
        ...mapGetters(['profileData'])
    },
    watch: {
        profileData(newVal) {
            this.profile = newVal.user;
            this.editProfile.name = newVal.user.name;
            this.editProfile.email = newVal.user.email;
        },
    },
    methods: {
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        enterEditMode() {
            this.isEditMode = true;
            this.isDropdownOpen = false; // Close dropdown
        },
        saveProfile() {
            this.$store.dispatch('saveProfile', this.editProfile).then(() => {
                this.profile.name = this.editProfile.name;
                this.profile.email = this.editProfile.email;
                this.isEditMode = false; // Exit edit mode
            });
        },
        cancelEdit() {
            this.isEditMode = false; // Exit edit mode without saving
        }
    },
    mounted() {
        this.$store.dispatch('adminAuthProfile');
    }
};
</script>

<style scoped>
/* Custom dropdown styles */
#dropdownButton:focus + #dropdown,
#dropdownButton:hover + #dropdown {
    display: block;
}
</style>
