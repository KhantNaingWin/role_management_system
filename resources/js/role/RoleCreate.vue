<template>
  <v-app>
    <div class="flex h-screen bg-gray-100 font-roboto">
      <!-- Sidebar -->
      <Sidebar class="sidebar" />

      <!-- Main Content -->
      <v-container fluid class="pa-6 flex-grow-1">
        <v-row>
          <v-col cols="12" md="8">
            <!-- Loading and Success Messages -->
            <v-alert v-if="loading" type="info" dismissible>
              Creating role, please wait...
            </v-alert>
            <v-alert
              v-if="successMessage"
              type="success"
              dismissible
              @close="successMessage = ''"
            >
              {{ successMessage }}
            </v-alert>

            <!-- Form Section -->
            <v-card class="mt-8 ms-40">
              <v-card-title>
                <span class="text-h5">Create New Role</span>
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="newRole">
                  <v-row class="mb-4">
                    <v-col>
                      <v-text-field
                        v-model="role.name"
                        label="Enter role name"
                        outlined
                        required
                      />
                    </v-col>
                    <v-col class="d-flex align-center">
                      <v-btn type="submit" color="blue" class="w-25">
                        Create
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      v-for="permission in Permissions"
                      :key="permission.id"
                      cols="3"
                      sm="4"
                    >
                      <v-checkbox
                        v-model="role.permissions"
                        :label="permission.name"
                        :value="permission.name"
                        :id="String(permission.id)"
                      />
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex/dist/vuex.cjs.js";
import Sidebar from "../admin/Sidebar.vue";
import api from "../api/api";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      role: {
        name: "",
        permissions: [],
      },
      Permissions: [],
      loading: false,
      successMessage: "",
    };
  },
  computed: {
    ...mapGetters(["storePermissions"]),
  },
  watch: {
    storePermissions: {
      immediate: true,
      handler(newVal) {
        this.Permissions = newVal;
      },
    },
  },
  methods: {
    async newRole() {
      if (this.role.name.trim()) {
        this.loading = true;
        this.successMessage = "";
        try {
          await this.$store.dispatch("newRoles", { ...this.role });
          this.successMessage = "Role created successfully!";
          this.role.name = "";
          this.role.permissions = [];
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      }
    },
    async fetchData() {
      try {
        const response = await api.get("/api/permission");
        this.Permissions = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
}
</style>
