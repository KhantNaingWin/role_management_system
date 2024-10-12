import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import Home from "../user/Home.vue";
import AdminHome from "../admin/Home.vue";
import api from "../api/api";

export const routes = [
   {
    path : '/register',
    name : 'register',
    component : Register,
   },
   {
    path : '/login',
    name : 'login',
    component : Login,

   },
   {
    path : '/admin/home',
    name : 'admin-home',
    component : AdminHome,
   },

   {
    path : '/user/home',
    name : 'home',
    component : Home,
   },
]

 async function isAuth(){
    try {
            const response = await api.get('/api/user')
            const role = response.data.role
            return role
    } catch (error) {
        console.error(error)
    }
 }




