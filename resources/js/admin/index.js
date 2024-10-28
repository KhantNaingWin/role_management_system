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
            currentRole: null,
            userlists: null,
            formData: {
                name: '',
                email: '',
                password: ''
            },
            roles: null,
            editingRoleId: null,
            selectedRole: '',
            successMessage: '',
            permissions: null,
        };
    },
    computed: {
        ...mapGetters(["storeToken", "storeUserData", "storeRoles","authPermission","authRole"]),
    },
    watch: {
        storeUserData(userData) {
            this.userlists = userData;
        },
        storeRoles(allRoles) {
            this.roles = allRoles;
        },
        authPermission(permissions) {
           this.permissions = permissions;

        },
        authRole(role) {
            this.currentRole = role;
        }
    },
    methods: {
        showRoleSelect(userId) {
            this.editingRoleId = userId;
        },
        async changeUserRole(userId, newRole) {
            try {
                await this.$store.dispatch("updateUserRole", { userId, newRole });
                this.successMessage = 'Role changed successfully!';
                this.editingRoleId = null;

                setTimeout(() => {
                    this.successMessage = '';
                }, 3000);

                // Re-fetch data after role change
                this.fetchData();
            } catch (error) {
                console.error('Failed to change user role:', error);
                alert('Failed to change user role.');
            }
        },
        async fetchData() {
            // Only fetch if user lists or roles are not already loaded
            if (!this.userlists || !this.roles) {
                this.$store.dispatch("getUserData");
                this.$store.dispatch("getRoles");
            }
            // Fetch profile information
            this.$store.dispatch('adminAuthProfile');
        },
        createData() {
                this.$router.push('/user/create');
        },
        userEdit(userID) {
            this.$router.push(`/admin/account/edit/${userID}`);
        },
        async userDelete(userID) {
            try {
                await this.$store.dispatch("deleteUser", userID);
                this.fetchData(); // Re-fetch data after deleting a user
            } catch (error) {
                console.error('Failed to delete user:', error);
            }
        },
        logout() {
            this.$store.dispatch("logout");
            this.$router.push("/login");
            this.userlists = null;
            this.roles = null;
        }
    },
    async mounted() {
        this.fetchData(); // Fetch data when the component is mounted

        // Check login status
        if (localStorage.getItem("token") != null) {
            this.loginStatus = true;
        } else {
            this.loginStatus = false;
            this.$router.push("/login");
        }
    },
};
