<template>
   <div class="mt-5">
          <div class="container col-3 shadow-sm my-5 p-3">
            <form action="" class="max-w-sm mx-auto"  @submit.prevent="submitForm">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="formData.name" aria-describedby="emailHelp">
                  <small v-if="this.errorMessage != null" class="text-red-600">{{ this.errorMessage }}</small>
                </div>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                  <input type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="formData.email" aria-describedby="emailHelp">
                  <small v-if="this.errorMessage != null" class="text-red-600">{{ this.errorMessage }}</small>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" v-model="formData.password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="exampleInputPassword1">
                </div>
                <div class="">
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                    <router-link to="/login" class="ms-10 text-green-600">Do you have account?</router-link>
                    <!-- <small >Do you have account?</small> -->
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
