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
    {
        path: '/editor/home',
        name: 'editor-home',
        component: AdminHome,
        beforeEnter: async (to, from, next) => {
            await roleBasedAuth('editor', next);
        }
    },
];

// Centralized authentication function
async function roleBasedAuth(requiredRole, next) {
    const token = store.state.token;

    if (!token) {
        // If no token is found, redirect to login
        return next({ name: 'login' });
    }

    try {
        // Verify the user's role by making an API call
        const response = await api.get('/api/users', {
            headers: {
                Authorization: `Bearer ${token}`, // Use the token in the request headers
            },
        });


        // Extract roles from the response
        const roles = response.data[1].flatMap(user => user.roles.map(role => role.name));
        if (roles.includes(requiredRole)) {
            // Allow navigation if the required role matches
            return next();
        } else {
            // Redirect based on role if it doesn't match the required role
            const userRole = roles; // Get the first role (you can change this logic as needed)
            return redirectToRoleHome(userRole, next);
        }

    } catch (error) {
        console.errosr(error);
        // Redirect to login if there is an error
        next({ name: 'login' });
    }
}

// Helper function to redirect to the appropriate home route based on role
function redirectToRoleHome(role, next) {
    switch (role) {
        case 'admin':
            next({ name: 'admin-home' });
            break;
        case 'user':
            next({ name: 'user-home' });
            break;
        case 'editor':
            next({ name: 'editor-home' });
            break;
        default:
            // Redirect to a default dashboard or home page if role is unknown
            next({ name: 'dashboard' });
            break;
    }
}
