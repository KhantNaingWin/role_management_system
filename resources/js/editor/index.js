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
              }

        };
    },
    computed: {
        ...mapGetters(["storeToken", "storeUserData"]),
    },
    methods: {
        async fetchData() {
            try {
                const response = await api.get("api/users");
                this.$store.dispatch("getUserData", response.data);
                this.userlists = this.storeUserData.userlist;
                this.currentRole = this.storeUserData.roles[0].name;
            } catch (error) {
                console.error(error);
            }
        },

        //role change

        roleChange(userID){
            this.$swal({
                title: "Select role",
                input: "select",
                inputOptions: {
                    'admin' : 'Admin',
                    'editor' : "Editor",
                    'user' : 'User',
                },
                inputPlaceholder: "Select a role",
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRole = result.value;
                    api.post('/api/user/rolechange',{
                        'id' : userID,
                        'role' : selectedRole
                    }).then(response => {
                        location.reload();
                        console.log(response);

                    })
                }
            });
        },

        createData() {
            this.$swal({
                title: 'Enter your details',
                html: `
                <input type="text" id="swal-input-name" class=" rounded-md swal2-input" placeholder="Name">
                <input type="email" id="swal-input-email" class=" rounded-md swal2-input" placeholder="Email">
                <input type="password" id="swal-input-password" class=" rounded-md swal2-input" placeholder="Password">
              `,
              focusConfirm: false,
              showCancelButton: true,
              confirmButtonText: 'Submit',
              preConfirm: () => {
                const name = document.getElementById('swal-input-name').value;
                const email = document.getElementById('swal-input-email').value;
                const password = document.getElementById('swal-input-password').value;

                if (!name || !email || !password) {
                  Swal.showValidationMessage('Please fill out all fields');
                  return;
                }

                return { name, email, password };
              }
            }).then((result) => {
                if (result.isConfirmed) {
                  // Bind the input data to the Vue component's data
                  this.formData.name = result.value.name;
                  this.formData.email = result.value.email;
                  this.formData.password = result.value.password;
                }
                   try {
            //    if(showCancelButton){
                api.post('/api/user/create',this.formData).then(response =>{
                    console.log(response);

                    this.$store.dispatch("getUserData", response.data);
                    location.reload();
                        return;
                  })
            //    }

           } catch (error) {
            console.log(error);

           }
              });





        },
        userEdit(userID,userName,userEmail){


            this.formData = {
                'id' :userID,
                'name' :  userName,
                'email' :  userEmail
            }

            this.$swal({
                title: 'Update your details',
                html: `
          <input type="text" id="swal-input-name" class="swal2-input" placeholder="Name" value='${this.formData.name}'>
          <input type="email" id="swal-input-email" class="swal2-input" placeholder="Email" value="${this.formData.email}">
          <input type="password" id="swal-input-password" class="swal2-input" placeholder="Password" value="${this.formData.password}">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Update',
        preConfirm: () => {
          const name = document.getElementById('swal-input-name').value;
          const email = document.getElementById('swal-input-email').value;
          const password = document.getElementById('swal-input-password').value;

          if (!name || !email || !password) {
            Swal.showValidationMessage('Please fill out all fields');
            return;
          }

          return { name, email, password };
        }
            }).then((result) => {
                if (result.isConfirmed) {
                  // Bind the input data to the Vue component's data
                  this.formData.name = result.value.name;
                  this.formData.email = result.value.email;
                  this.formData.password = result.value.password;
                }
                   try {
            //    if(!showCancelButton){
                api.post('/api/user/update',this.formData).then(response =>{
                    this.$store.dispatch("getUserData", response.data);
                    location.reload();
                        return;
                  })
            //    }

           } catch (error) {
            console.log(error);

           }
              });

        },
        userDelete (userID){
            console.log(userID);


                this.$swal({
                    title: 'Are you sure?',
                    text: 'Do you really want to delete this user? This action cannot be undone.',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'Cancel',
                    reverseButtons: true
                }).then((result)=>{
                        if(result.isConfirmed){
                          api.delete(`/api/user/delete/${userID}`)
                          location.reload();
                        }
                })
        },

    },

    mounted() {
        this.fetchData();
        if (localStorage.getItem("token") != null) {
            this.loginStatus = true;
        } else {
            this.loginStatus = false;
            this.$router.push("/login");
        }
    },
};
