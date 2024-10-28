import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import Home from "../user/Home.vue";
import AdminHome from "../admin/Home.vue";
import api from "../api/api";
import store from "../store";
import PostPage from "../admin/post/Postcreate.vue";
import Mainlayout from "../Mainlayout.vue";
import RoleManagement from "../role/RoleManagement.vue";
import Edit from "../admin/Edit.vue";
import Create from "../admin/Create.vue";
import Profile from "../components/Profile.vue";
import EditRole from "../role/EditRole.vue";

export const routes = [
    {
        path: '/',
        name: 'main',
        component: Mainlayout,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/admin/home',
        name: 'admin-home',
        component: AdminHome,
        beforeEnter: async (to, from, next) => {
            await roleBasedAuth('admin', next);
        }
    },
    {
        path: '/user/create',
        name: 'user-create',
        component: Create,
        beforeEnter: async (to, from, next) => {
            await roleBasedAuth('admin', next);
        }
    },
    {
        path: '/admin/post/create',
        name: 'admin-post-create',
        component: PostPage,
        beforeEnter: async (to, from, next) => {
            await roleBasedAuth('admin', next);
        }
    },
    {
        path: '/admin/account/edit/:id',
        name: 'admin-account-edit',
        component: Edit,
        beforeEnter: async (to, from, next) => {
            await roleBasedAuth('admin', next);
        }
    },
    {
        path: '/admin/role',
        name: 'admin-role',
        component: RoleManagement,
        beforeEnter: async (to, from, next) => {
            await roleBasedAuth('admin', next);
        }
    },
    {
        path: '/edit/role/:id',
        name: 'edit-role',
        props: true,
        component: EditRole,
        beforeEnter: async (to, from, next) => {
            await roleBasedAuth('admin', next);
        }
    },
    {
        path: '/admin/profile',
        name: 'admin-profile',
        component: Profile,
        beforeEnter: async (to, from, next) => {
            await roleBasedAuth('admin', next);
        }
    },
    {
        path: '/user/home',
        name: 'user-home',
        component: Home,
        beforeEnter: async (to, from, next) => {
            await roleBasedAuth('user', next);
        }
    },
    // {
    //     path: '/editor/home',
    //     name: 'editor-home',
    //     component: AdminHome,
    //     beforeEnter: async (to, from, next) => {
    //         await roleBasedAuth('editor', next);
    //     }
    // },
];

// Centralized authentication function
async function roleBasedAuth(requiredRole, next) {
    const token = store.state.token;

    if (!token) {
        // If no token is found, redirect to login
        return next({ name: 'login' });
    }

    try {

        const response = await api.get('/api/login/profile'

        );

        const roles = response.data.user?.roles.map(role => role.name);
        if (roles.includes(requiredRole)) {

            return next();
        } else {

            const userRole = roles;
            return redirectToRoleHome(userRole, next);
        }

    } catch (error) {
        console.error(error);

        next({ name: 'login' });
    }
}


function redirectToRoleHome(role, next) {
    switch (role) {
        case 'user':
            next({ name: 'user-home' });
            break;
        default:
            // Redirect to a default dashboard or home page if role is unknown
            next();
            break;
    }
}
