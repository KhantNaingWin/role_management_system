<template>
    <div class="flex justify-center items-center min-h-screen bg-white px-6">
        <div class="p-8 max-w-sm w-full bg-white shadow-lg rounded-lg transform transition duration-300 hover:shadow-xl">
            <h2 class="text-2xl font-semibold text-center mb-6 text-gray-800">Register</h2>

            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        v-model="formData.name"
                        class="mt-2 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition duration-200"
                    />
                    <small v-if="errorMessage" class="text-red-600">{{ errorMessage }}</small>
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        v-model="formData.email"
                        class="mt-2 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition duration-200"
                    />
                    <small v-if="errorMessage" class="text-red-600">{{ errorMessage }}</small>
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        v-model="formData.password"
                        class="mt-2 w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition duration-200"
                    />
                </div>

                <div class="mt-6">
                    <button
                        type="submit"
                        class="w-full py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200 transform hover:scale-105"
                    >
                        Register
                    </button>
                </div>

                <div class="mt-4 text-center">
                    <router-link
                        to="/login"
                        class="text-sm text-indigo-600 hover:underline"
                    >
                        Already have an account? Log in
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import api  from '../api/api';
import { mapGetters } from "vuex";
    export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
      },
      errorMessage: null, // To store error messages
    };
  },
  computed: {
        ...mapGetters(["storeToken", "storeUserData"]),
    },
  methods: {
    async submitForm() {
        // console.log(this.formData);

      try {
        const response = await api.post('api/register', this.formData);
        const token = response.data.token;
        const userData = response.data.user;
        if(token){
            this.$store.dispatch("register", token);
            this.$store.dispatch("getUserData", userData)

        }
        if(this.storeToken || this.storeUserData.roles[0].name == 'user'){
            this.$router.push('/user/home')
        }



        this.formData = {}; // Reset form data
      } catch (error) {
        if (error) {
          // Laravel validation error
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'Something went wrong. Please try again.';
        }
      }
    },
  },
  mounted() {
    this.formData = {};
  },
};
</script>

<style lang="scss" scoped>

</style>
