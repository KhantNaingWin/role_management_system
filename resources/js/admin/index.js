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
            userlists: [],
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
    },
    methods: {
        async fetchData() {
            try {
                const response = await api.get("api/admin");
                this.$store.dispatch("getUserData", response.data);
                this.userlists = this.storeUserData;

                this.currentRole = this.storeUserData.roles;
            } catch (error) {
                console.error(error);
            }
        },

        //role change

        createData() {
            this.$router.push('/user/create');

        },
        userEdit(userID){
            this.$router.push(`/admin/account/edit/${userID}`)
        },
       async  userDelete (userID){
            const originalUserList = [...this.userlists]
            this.userlists = this.userlists.filter(user => user.id !== userID);
            try {
                // Send a DELETE request to the server
                await api.delete(`/api/admin/${userID}`);
            } catch (error) {
                // If the server request fails, restore the original user list
                this.userlists = originalUserList;
                console.error("Error deleting user from the server:", error);
            }
        },

    },

   async mounted() {
        await this.fetchData();
        if (localStorage.getItem("token") != null) {
            this.loginStatus = true;
        } else {
            this.loginStatus = false;
            this.$router.push("/login");
        }
    },
};
