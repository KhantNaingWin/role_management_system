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
                            <v-data-table-server
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
                                            <v-btn icon @click="editItem(item)">
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn icon @click="deleteItem(item.id)">
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
import api from '../../api/api';

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

        const { page, itemsPerPage} = options;
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
        // Implement your delete logic here
      },
    },
    mounted() {
      // Initial fetch
      this.fetchData({ page: this.page, itemsPerPage: this.itemsPerPage });
    },
  };
  </script>
