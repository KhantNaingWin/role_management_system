<template>
    <div x-data="{ sidebarOpen: false }" class="flex h-screen bg-gray-100 font-roboto">
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                <div class="container mx-auto px-6 py-8">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div v-if="authPermission?.includes('post_read')" class="bg-white p-6 rounded-lg shadow-lg col-span-1 lg:col-span-3">
                            <h2 class="text-xl font-semibold mb-4">Post Lists</h2>
                            <v-btn color="secondary" @click="postcreate" class="mb-4">
                                Create Post
                            </v-btn>
                            <v-text-field
                                v-model="search"
                                label="Search"
                                clearable
                                @input="fetchData({ page: 1, itemsPerPage: itemsPerPage,search })"
                                 @click:clear="handleClear"
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
                            <v-data-table-server
                            v-else
                                :headers="headers"
                                :items="items?.data"
                                :items-length="totalItems"
                                :loading="loading"
                                :items-per-page="itemsPerPage"
                                @update:options="fetchData"
                                class="elevation-1"
                            >
                                <template v-slot:item="{ item }">
                                    <tr>
                                        <td >{{ item.title }}</td>
                                        <td>{{ item.description }}</td>
                                        <td class="space-x-2">
                                            <v-btn  v-if="authPermission?.includes('update_post')" icon @click="editItem(item)">
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn icon  v-if="authPermission?.includes('delete_post')" @click="deleteItem(item.id)">
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table-server>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>



  <script>
import { mapGetters } from 'vuex/dist/vuex.cjs.js';
import Sidebar from '../Sidebar.vue';

  export default {
    components :{
        Sidebar
    },
    data() {
      return {
        loading: false,
        items: [],
        totalItems: 0,
        itemsPerPage: 10,
        page: 1,
        search: '',
        headers: [
          { title: 'Title', value: 'title' },
          { title: 'Description', value: 'description' },
          { title: 'Actions', value: 'actions', sortable: false },
        ],
      };
    },
    computed: {
        ...mapGetters(["authPermission","storePostData"]),
    },
    watch: {
        storePostData(posts){
            this.items = posts
           this.totalItems= posts.total

        }
    },
    methods: {
      fetchData(options) {
        this.loading = true;

        const { page, itemsPerPage,search } = options;
        try {
            this.$store.dispatch("fetchPosts",options);
            this.loading = false;

        } catch (error) {
            console.log(error);

        }

      },
      postcreate(){
        this.$router.push('/admin/post/form')
      },
      editItem(item) {
        this.$router.push(`/admin/post/form/${item.id}`)

      },
      deleteItem(itemId) {
        this.$store.dispatch("deletePost",itemId)
        .then(() => {
                    this.fetchData({ page: this.page, itemsPerPage: this.itemsPerPage});
                })
                .catch((error) => {
                    console.error(error);
                });
      },
      handleClear() {
            this.search = ''; 
            this.fetchData({ page: 1, itemsPerPage: this.itemsPerPage, search: '' }); // Fetch original data
        },
    },
    mounted() {
      this.fetchData({ page: this.page, itemsPerPage: this.itemsPerPage });
    },
  };
  </script>
