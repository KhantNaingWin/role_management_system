import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import Home from "../user/Home.vue";
import AdminHome from "../admin/Home.vue";
import api from "../api/api";
import store from "../store";
import Editor from  "../editor/Home.vue";
import PostPage from "../admin/post/Postcreate.vue"

export const routes = [
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
    path: '/admin/post/create',
    name: 'admin-post-create',
    component: PostPage,
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
    component: Editor,
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

        const role = response.data.roles[0].name;

        if (role === requiredRole) {
            // Allow navigation if the role matches
            next();
        } else {
            // Redirect based on role if it doesn't match the required role
            redirectToRoleHome(role, next);
        }
    } catch (error) {
        console.error(error);
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
