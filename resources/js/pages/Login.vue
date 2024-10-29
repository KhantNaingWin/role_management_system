<template>
    <div class="flex justify-center items-center min-h-screen bg-white px-6">
        <div class="p-8 max-w-sm w-full bg-white shadow-lg rounded-lg transform transition duration-300 hover:shadow-xl">
            <div
                v-if="errorStatus"
                class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4"
                role="alert"
            >
                <small>{{ errorMessage }}</small>
            </div>
            <div class="flex justify-center items-center mb-6">
                <svg
                    class="h-12 w-12 text-indigo-600"
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

            <form class="mt-6" @submit.prevent="loginUserData">
                <label class="block">
                    <span class="text-gray-700 text-sm font-medium">Email</span>
                    <input
                        v-model="formData.email"
                        type="email"
                        class="form-input mt-2 block w-full rounded-md border-2 border-gray-300 focus:border-indigo-600 focus:ring-indigo-600 transition duration-200"
                    />
                </label>

                <label class="block mt-4">
                    <span class="text-gray-700 text-sm font-medium">Password</span>
                    <input
                        v-model="formData.password"
                        type="password"
                        class="form-input mt-2 block w-full rounded-md border-2 border-gray-300 focus:border-indigo-600 focus:ring-indigo-600 transition duration-200"
                    />
                </label>

                <div class="flex justify-between items-center mt-6">
                    <label class="inline-flex items-center">
                        <input
                            type="checkbox"
                            class="form-checkbox text-indigo-600 rounded"
                        />
                        <span class="ml-2 text-gray-600 text-sm">Remember me</span>
                    </label>

                    <a
                        class="text-sm text-indigo-600 hover:underline"
                        href="#"
                    >
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    class="mt-6 w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md shadow transition duration-200 transform hover:scale-105"
                >
                    Sign in
                </button>
            </form>
        </div>
    </div>
</template>


<script>
import api from "../api/api";

export default {
    data() {
        return {
            formData: {
                name: "",
                email: "",
            },
            errorStatus: false,
        };
    },
    methods: {
        // this is login user data

        async loginUserData() {
            // console.log(data);

            await api
                .post("/api/login", this.formData)
                .then((response) => {
                    const token = response.data.token;
                    if(token!==null){
                        localStorage.setItem("token", token);
                    }
                    const userData = response.data.user;
                        window.axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
                        const role = userData.roles[0]?.name;
                        console.log(role);

                       switch (role) {
                        case "user":
                            this.$router.replace({ name: "user-home" });
                            break;
                        default:
                        this.$router.replace({ name: "admin-home" });
                            break;
                       }

                })
                .catch((error) => {
                    console.info(error);
                    this.errorStatus = true;
                    this.errorMessage = error;
                    this.formData = {};
                });
        },
    },
    mounted() {
        this.formData = {};
        // if (localStorage.getItem("token")) {
        //     this.loginStatus = true;
        // } else {
        //     this.loginStatus = false;
        //     this.$router.push("/login");
        // }
    },
};
</script>
