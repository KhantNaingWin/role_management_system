<template>
    <div class="flex justify-center items-center min-h-screen bg-white px-6">
      <div class="p-8 max-w-sm w-full shadow-lg rounded-lg transition duration-300 hover:shadow-xl">
        <v-alert
          v-if="errorStatus"
          type="error"
          dismissible
          class="mb-4"
        >
          <small>{{ errorMessage }}</small>
        </v-alert>

        <v-form @submit.prevent="loginUserData" ref="form">
          <v-text-field
            v-model="formData.email"
            label="Email"
            type="email"
            outlined
            dense
            required
          ></v-text-field>

          <v-text-field
            v-model="formData.password"
            label="Password"
            type="password"
            outlined
            dense
            required
            class="mt-4"
          ></v-text-field>

          <v-btn
            type="submit"
            color="indigo"
            block
            class="mt-6"
            :disabled="loading"
          >
          <v-progress-circular
        v-if="loading"
        indeterminate
        color="indigo"
        class="mx-auto"
      ></v-progress-circular>
          <span v-else>Sign in</span>
          </v-btn>
        </v-form>

      </div>
    </div>
  </template>

  <script>
  import api from "../api/api";

  export default {
    data() {
      return {
        formData: {
          email: "",
          password: "",
          rememberMe: false,
        },
        errorStatus: false,
        errorMessage: "",
        loading: false,
      };
    },
    methods: {
      async loginUserData() {
        this.loading = true;
        this.errorStatus = false;
        try {
          const response = await api.post("/api/login", this.formData);
          const token = response.data.token;

          if (token) {
            localStorage.setItem("token", token);
            window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            const userData = response.data.user;
            const role = userData.roles[0]?.name;

            switch (role) {
              case "user":
                this.$router.replace({ name: "user-home" });
                break;
              default:
                this.$router.replace({ name: "admin-home" });
                break;
            }
          }
        } catch (error) {
          console.error(error);
          this.errorStatus = true;
          this.errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
          this.formData.password = "";
        }
        finally {
        this.loading = false;
      }
      },
    },
  };
  </script>
