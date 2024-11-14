<!-- <template>
    <Navbar />

    <div class="grid grid-cols-4 gap-4">
        <div v-for="post in userposts" :key="post.id" class="max-w-sm rounded overflow-hidden mt-5 shadow-lg">
        <img
            class="w-full"
            src="../../css/images.jpg"
            alt="Sunset in the mountains"
        />
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ post.title }}</div>
            <p class="text-gray-700 text-base">
                {{ post.description }}
            </p>
        </div>
        <div class="px-6 pt-4 pb-2">
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >#photography</span
            >
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >#travel</span
            >
            <span
                class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >#winter</span
            >
        </div>
    </div>
    </div>
</template> -->
<template>
    <Navbar />
    <v-row>
      <v-col v-for="post in userposts" :key="post.id" cols="12" md="4">
        <v-card
          subtitle="This is a card subtitle"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          title="This is a title"
        >
          <v-img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </template>


<script>
import { mapGetters } from "vuex";
import Navbar from "../HomeNav.vue";

export default {
    components: {
        Navbar,
    },
    computed: { ...mapGetters(["userposts"]) },
    // watch: {
    //     userposts() {
    //         console.log(this.userposts);
    //     },
    // },
    mounted() {
        this.$store.dispatch("userpostlists");
    },
};
</script>
