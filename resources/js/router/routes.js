import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import Home from "../user/Home.vue";
import AdminHome from "../admin/Home.vue";
import api from "../api/api";
import PostPage from "../admin/post/Postcreate.vue";
import Mainlayout from "../Mainlayout.vue";
import RoleManagement from "../role/RoleManagement.vue";
import Edit from "../admin/Edit.vue";
import Create from "../admin/Create.vue";
import Profile from "../components/Profile.vue";
import EditRole from "../role/EditRole.vue";

export const routes = [
    { path: '/', name: 'main', component: Mainlayout },
    {
        path: '/register', name: 'register', component: Register, beforeEnter: (to, from, next) => {
            switch (!localStorage.getItem('token')) {
                case true:
                    next();
                    break;

                default: false
                    next({ name: 'user-home' })
                    break;
            }
            return !localStorage.getItem('token')
        }
    },
    {
        path: '/login', name: 'login', component: Login, beforeEnter: (to, from, next) => {
            switch (!localStorage.getItem('token')) {
                case true:
                    next();
                    break;

                default: false
                    next({ name: 'user-home' })
                    break;
            }
            return !localStorage.getItem('token')
        }
    },
    {
        path: '/admin/home',
        name: 'admin-home',
        component: AdminHome,
        beforeEnter: async (to, from) => {
            await roleBasedAuth('admin');
        }
    },
    {
        path: '/user/create',
        name: 'user-create',
        component: Create,
        beforeEnter: async (to, from) => {
            await roleBasedAuth('admin');
        }
    },
    {
        path: '/admin/post/create',
        name: 'admin-post-create',
        component: PostPage,
        beforeEnter: async (to, from) => {
            await roleBasedAuth('admin');
        }
    },
    {
        path: '/admin/account/edit/:id',
        name: 'admin-account-edit',
        component: Edit,
        beforeEnter: async (to, from) => {
            await roleBasedAuth('admin');
        }
    },
    {
        path: '/admin/role',
        name: 'admin-role',
        component: RoleManagement,
        beforeEnter: async (to, from) => {
            await roleBasedAuth('admin');
        }
    },
    {
        path: '/edit/role/:id',
        name: 'edit-role',
        props: true,
        component: EditRole,
        beforeEnter: async (to, from) => {
            await roleBasedAuth('admin');
        }
    },
    {
        path: '/admin/profile',
        name: 'admin-profile',
        component: Profile,
        beforeEnter: async (to, from) => {
            await roleBasedAuth('admin');
        }
    },
    {
        path: '/user/home',
        name: 'user-home',
        component: Home,
        beforeEnter: async (to, from) => {
            await roleBasedAuth('user');
        }
    },
];

// Centralized authentication function
async function roleBasedAuth() {
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirect to login if no token is found
        return next({ name: 'login' });
    }

    try {
        // API call to fetch user roles with authorization header
        const response = await api.get('/api/login/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Extract roles from the response
        const roles = response.data.user?.roles[0]?.name;
        if (roles !== 'user') {
            routes.push({ name: 'admin-home' });
        } else {
            routes.push({ name: 'user-home' });
        }

    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
}

