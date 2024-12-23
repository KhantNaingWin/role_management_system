<template>
  <v-container class="d-flex justify-center align-center min-height-100vh">
    <v-card class="pa-8 max-width-400">
      <v-card-title class="text-center">
        <span class="headline">Register</span>
      </v-card-title>

      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.name"
          label="Name"
          :error-messages="errorMessage ? [errorMessage] : []"
          outlined
          dense
          class="mb-4"
        ></v-text-field>

        <v-text-field
          v-model="formData.email"
          label="Email"
          :error-messages="errorMessage ? [errorMessage] : []"
          outlined
          dense
          class="mb-4"
        ></v-text-field>

        <v-text-field
          v-model="formData.password"
          label="Password"
          type="password"
          outlined
          dense
          class="mb-4"
        ></v-text-field>

        <v-btn type="submit" color="primary" block class="mt-6">
          Register
        </v-btn>

        <v-btn text block class="mt-4" @click="$router.push('/login')">
          Already have an account? Log in
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import api from "../api/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
      errorMessage: null, // To store error messages
    };
  },
  computed: {
    // ...mapGetters(["storeUserData"]),
  },
  methods: {
    async submitForm() {
      try {
        const response = await api.post("api/register", this.formData);
        const token = response.data.token;
        const userData = response.data.user;

        localStorage.setItem("token", token);

        this.$router.push("/user/home");

        this.formData = {}; // Reset form data
      } catch (error) {
        if (error) {
          // Laravel validation error
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = "Something went wrong. Please try again.";
        }
      }
    },
  },
  mounted() {
    this.formData = {};
  },
};
</script>

<style scoped>
.min-height-100vh {
  min-height: 100vh;
}
.max-width-400 {
  max-width: 400px;
}
</style>
