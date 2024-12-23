<template>
  <v-app>
    <div
      x-data="{ sidebarOpen: false }"
      class="flex h-screen bg-gray-200 font-roboto"
    >
      <div
        x-cloak
        class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      ></div>
      <Sidebar />
      <div class="flex-1 flex flex-col overflow-hidden">
        <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div class="container mx-auto px-6 py-8">
            <div class="mt-8">
              <div class="mt-6">
                <div class="sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <!-- Message Toast -->
                  <v-snackbar
                    v-model="messageStatus"
                    color="green"
                    timeout="3000"
                  >
                    <v-icon left>mdi-check-circle</v-icon>
                    {{ message }}
                    <template #action="{ attrs }">
                      <v-btn text v-bind="attrs" @click="messageStatus = false">
                        Close
                      </v-btn>
                    </template>
                  </v-snackbar>

                  <div
                    class="flex justify-center min-w-full shadow rounded-lg overflow-hidden"
                  >
                    <div class="w-full max-w-xs">
                      <v-form @submit.prevent="UpdateUser">
                        <v-text-field
                          v-model="formData.name"
                          label="Name"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="formData.email"
                          label="Email"
                          type="email"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="formData.password"
                          label="Password"
                          type="password"
                          required
                        ></v-text-field>

                        <div class="flex my-3 items-center justify-between">
                          <v-btn
                            type="submit"
                            color="blue"
                            :loading="loading"
                            :disabled="loading"
                          >
                            Update
                          </v-btn>
                        </div>
                      </v-form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Sidebar from "./Sidebar.vue";
export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
      },
      message: "",
      messageStatus: false,
      loading: false,
      userId: null,
    };
  },
  computed: {
    ...mapGetters(["storeEditUser", "updateSuccess"]),
  },
  watch: {
    storeEditUser(newValue) {
      this.formData = newValue[0];
    },
    updateSuccess(newValue) {
      if (newValue) {
        this.message = "User updated successfully";
        this.messageStatus = true;
        setTimeout(() => {
          this.message = "";
          this.messageStatus = false;
        }, 3000);
      } else {
        this.message = "Failed to update user";
        this.messageStatus = false;
      }
    },
  },

  methods: {
    async UpdateUser() {
      this.loading = true;
      await this.$store.dispatch("updateUser", this.formData);
      this.loading = false;
    },
    async fetchData(userId) {
      try {
        this.$store.dispatch("fetchEditUser", userId);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
      }

      //
    },
  },

  mounted() {
    if (this.$route.params.id) {
      this.userId = this.$route.params.id;
      this.fetchData(this.userId);
    } else {
      console.error("No ID found in the route parameters");
    }
  },
};
</script>
