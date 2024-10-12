import api from "../api/api";
export default {
    name: "Navbar",
    data() {
        return {
            userData: {},
            error: null,
        };
    },

    methods: {
        logoutData() {
            const token = localStorage.getItem("token");
            console.log(token);

            if (token) {
                localStorage.removeItem("token");
                this.$router.push({ name: "login" });
            }
        },
    },
    mounted() {
        const token = localStorage.getItem("token");
        if (!token) {
            this.$router.push({ name: "login" });
        }
    },
};
