<template>
    <Navbar />

    <div class="grid grid-cols-4 gap-4">
        <div v-for="post in userposts" :key="post.id" class="max-w-sm rounded overflow-hidden shadow-lg">
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
</template>

<script>
import { mapGetters } from "vuex/dist/vuex.cjs.js";
import Navbar from "../HomeNav.vue";

export default {
    components: {
        Navbar,
    },
    computed: { ...mapGetters(["userposts"]) },

    data() {
        return {
            postlists: [],
        };
    },
    // watch: {
    //    if(userposts){
    //     this.postlists = userposts;
    //    }
    //     },
    mounted() {
        this.$store.dispatch("userpostlists");
    },
};
</script>
