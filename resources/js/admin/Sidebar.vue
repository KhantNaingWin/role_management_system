<template>
  <div
    class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition-transform duration-300 transform bg-gradient-to-b from-gray-900 to-gray-800 lg:translate-x-0 lg:static lg:inset-0 shadow-lg"
  >
    <div class="flex items-center justify-center mt-8">
      <div class="flex items-center">
        <svg
          class="w-12 h-12 text-blue-500"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
            fill="white"
          />
        </svg>
        <button
          @click="Profile"
          class="ml-2 text-2xl font-semibold text-white"
        >
          Profile
        </button>
      </div>
    </div>

    <nav class="mt-10">
      <a
        v-if="permissions?.includes('read')"
        @click="userList"
        class="flex items-center px-6 py-3 mt-4 text-gray-300 transition-colors duration-200 transform hover:bg-blue-600 hover:text-white rounded-lg"
      >
        <i class="fa-solid fa-users text-blue-400"></i>
        <span class="ml-3">Users</span>
      </a>

      <a
        v-if="permissions?.includes('post_read')"
        @click="postPage"
        class="flex items-center px-6 py-3 mt-4 text-gray-300 transition-colors duration-200 transform hover:bg-blue-600 hover:text-white rounded-lg"
      >
        <i class="fa-solid fa-newspaper text-green-400"></i>
        <span class="ml-3">Post</span>
      </a>

      <a
        v-if="currentRole ? currentRole[0]?.name === 'admin' : ''"
        @click="rolePage"
        class="flex items-center px-6 py-3 mt-4 text-gray-300 transition-colors duration-200 transform hover:bg-blue-600 hover:text-white rounded-lg"
      >
        <i class="fa-solid fa-shield-halved text-purple-400"></i>
        <span class="ml-3">Roles</span>
      </a>

      <button
        @click="logoutData"
        class="flex items-center px-6 py-3 mt-8 w-full bg-red-600 text-white rounded-lg transition duration-200 transform hover:bg-red-700 shadow-lg"
      >
        <i class="fa-solid fa-right-from-bracket"></i>
        <span class="ml-3">Logout</span>
      </button>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "../api/api";
export default {
  data() {
    return {
      currentRole: null,
      permissions: null,
    };
  },
  computed: {
    ...mapGetters(["authRole", "authPermission"]),
  },
  watch: {
    authRole(newVal) {
      this.currentRole = newVal;
    },
    authPermission(newVal) {
      this.permissions = newVal;
    },
  },
  methods: {
    async logoutData() {
      await api
        .post("/api/logout", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .catch((error) => {
          console.log(error);
        });
      localStorage.removeItem("token");

      this.$router.push("/login");
    },
    postPage() {
      this.$router.push("/admin/posts");
    },
    userList() {
      this.$router.push("/admin/home");
    },
    rolePage() {
      this.$router.push("/admin/role");
    },
    Profile() {
      this.$router.push("/admin/profile");
    },
  },
  mounted() {
    this.$store.dispatch("adminAuthProfile");
  },
};
</script>
