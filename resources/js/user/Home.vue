
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
