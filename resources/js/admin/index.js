import api from "../api/api";
import Sidebar from "./Sidebar.vue";
import { mapGetters } from "vuex";
export default {
    name: "Home",
    components: {
        Sidebar,
    },
    data() {
        return {
            loginStatus: false,
            currentRole: "",
            formData: {
                name: '',
                email: '',
                password: ''
              },
              roles : null

        };
    },
    computed: {
        ...mapGetters(["storeToken", "storeUserData"]),
        userData() {
            return this.storeUserData;
        }
    },
    methods: {
        async fetchData() {

            this.$store.dispatch("getUserData");

        },

        //role change

        createData() {
            this.$router.push('/user/create');

        },
        userEdit(userID){
            this.$router.push(`/admin/account/edit/${userID}`)
        },
       async  userDelete (userID){
        this.$store.dispatch("deleteUser", userID);
        this.fetchData();

            // this.userlists = this.userlists.filter(user => user.id !== userID);
            // try {
            //     // Send a DELETE request to the server
            //     await api.delete(`/api/admin/${userID}`);
            // } catch (error) {
            //     // If the server request fails, restore the original user list
            //     this.userlists = originalUserList;
            //     console.error("Error deleting user from the server:", error);
            // }
        },

    },

   async mounted() {
        this.fetchData();
        if (localStorage.getItem("token") != null) {
            this.loginStatus = true;
        } else {
            this.loginStatus = false;
            this.$router.push("/login");
        }
    },
};
