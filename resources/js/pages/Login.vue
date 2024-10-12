<template>
    <div class="flex justify-center items-center h-screen bg-gray-200 px-6">
        <div class="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
            <div
                v-if="this.errorStatus"
                class="alert alert-warning alert-dismissible fade show"
                role="alert"
            >
                <small class="text-red-500">{{ errorMessage }}</small>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                ></button>
            </div>
            <div class="flex justify-center items-center">
                <svg
                    class="h-10 w-10"
                    viewBox="0 0 512 512"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
                        fill="#4C51BF"
                        stroke="#4C51BF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
                        fill="white"
                    />
                </svg>
            </div>

            <form class="mt-4" @submit.prevent="loginUserData">
                <label class="block">
                    <span class="text-gray-700 text-sm">Email</span>
                    <input
                        v-model="formData.email"
                        type="email"
                        class="form-input mt-1 block w-full rounded-md focus:border-indigo-600"
                    />
                </label>

                <label class="block mt-3">
                    <span class="text-gray-700 text-sm">Password</span>
                    <input
                        v-model="formData.password"
                        type="password"
                        class="form-input mt-1 block w-full rounded-md focus:border-indigo-600"
                    />
                </label>

                <div class="flex justify-between items-center mt-4">
                    <div>
                        <label class="inline-flex items-center">
                            <input
                                type="checkbox"
                                class="form-checkbox text-indigo-600"
                            />
                            <span class="mx-2 text-gray-600 text-sm"
                                >Remember me</span
                            >
                        </label>
                    </div>

                    <div>
                        <a
                            class="block text-sm fontme text-indigo-700 hover:underline"
                            href="#"
                            >Forgot your password?</a
                        >
                    </div>
                </div>

                <div class="mt-6">
                    <button
                        type="submit"
                        class="py-2 px-4 text-center bg-indigo-600 rounded-md w-full text-white text-sm hover:bg-indigo-500"
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "../api/api";

export default {
    data() {
        return {
            formData: {
                name: "",
                email: "",
            },
            loginStatus: false,
            errorStatus: false,
        };
    },
    computed: {
        ...mapGetters(["storeToken", "storeUserData"]),
    },
    methods: {
        // this is login user data

        async loginUserData() {
            // console.log(data);

            await api
                .post("/api/login", this.formData)
                .then((response) => {
                    const token = response.data.token;
                    const userData = response.data.user;
                    if (token) {
                        this.loginStatus = true;
                        this.$store.dispatch("login", token);
                        this.$store.dispatch("getUserData", userData);
                        let roles = this.storeUserData.roles;
                        roles.forEach((role) => {
                            if(role.name === 'admin'){
                                this.$router.push('/admin/home')
                            }
                            if(role.name === 'editor'){
                                this.$router.push('/editor/home')
                            }
                            if(role.name === 'user'){
                                this.$router.push('/user/home')
                            }
                        });

                    }
                })
                .catch((error) => {
                    this.errorStatus = true;
                    this.errorMessage = error.response.data.message;
                    this.formData = {};
                });

        },
    },
    mounted() {
        this.formData = {};
        if (localStorage.getItem("token")) {
            this.loginStatus = true;
        } else {
            this.loginStatus = false;
            this.$router.push("/login");
        }
    },
};
</script>
