<template>
  <v-app>
    <div class="flex h-screen bg-gray-100 font-roboto">
      <Sidebar />
      <v-container fluid class="pa-6 flex-grow-1">
        <v-row justify="center">
          <v-col cols="12" md="10">
            <v-card class="mt-8">
              <v-card-title>
                <v-toolbar flat>
                  <v-toolbar-title>Post Lists</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="postcreate">
                    <v-icon left>mdi-plus</v-icon>Create Post
                  </v-btn>
                </v-toolbar>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="search"
                  label="Search"
                  clearable
                  @input="fetchData({ page: 1, itemsPerPage: itemsPerPage, search })"
                  @click:clear="handleClear"
                  class="mb-4"
                ></v-text-field>
                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  color="primary"
                  class="mx-auto"
                ></v-progress-circular>
                <div v-else-if="totalItems === 0" class="text-center py-4">
                  <p>No data available.</p>
                </div>
                <v-data-table
                  v-else
                  :headers="headers"
                  :items="items?.data"
                  :items-per-page="itemsPerPage"
                  :loading="loading"
                  @update:options="fetchData"
                  class="elevation-1"
                >
                  <template v-slot:item="{ item }">
                    <tr>
                      <td>{{ item.title }}</td>
                      <td>{{ item.description }}</td>
                      <td class="text-center">
                        <v-btn
                          elevation="0"
                          v-if="authPermission?.includes('update_post')"
                          icon
                          @click="editItem(item)"
                        >
                          <v-icon small class="text-green">mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn
                          elevation="0"
                          icon
                          v-if="authPermission?.includes('delete_post')"
                          @click="deleteItem(item.id)"
                        >
                          <v-icon small class="text-red">mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Sidebar from "../Sidebar.vue";

export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      loading: false,
      items: [],
      totalItems: 0,
      itemsPerPage: 10,
      page: 1,
      search: "",
      headers: [
        { text: "Title", value: "title" },
        { text: "Description", value: "description" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(["authPermission", "storePostData"]),
  },
  watch: {
    storePostData(posts) {
      this.items = posts;
      this.totalItems = posts.total;
    },
  },
  methods: {
    fetchData(options) {
      this.loading = true;
      const { page, itemsPerPage, search } = options;
      try {
        this.$store.dispatch("fetchPosts", options);
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    postcreate() {
      this.$router.push("/admin/post/form");
    },
    editItem(item) {
      this.$router.push(`/admin/post/form/${item.id}`);
    },
    deleteItem(itemId) {
      this.$store.dispatch("deletePost", itemId)
        .then(() => {
          this.fetchData({ page: this.page, itemsPerPage: this.itemsPerPage });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleClear() {
      this.search = "";
      this.fetchData({ page: 1, itemsPerPage: this.itemsPerPage, search: "" }); // Fetch original data
    },
  },
  mounted() {
    this.fetchData({ page: this.page, itemsPerPage: this.itemsPerPage });
  },
};
</script>
