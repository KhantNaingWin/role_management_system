<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function userLists(Request $request)
    {
        // Assuming the user is authenticated and admin
        if (auth()->user()->can("read")) {
            $user = $request->user();

            // Check if the user has the 'admin' role
            if ($user) {
                // Fetch all roles (or just user roles as needed)
                $roles = $user->roles;
                $allusers = User::all()->load('roles');

                // Return roles in a JSON response
                return response()->json([
                    'success' => true,
                    $roles,
                    $allusers,
                ]);
            }

            // Return an unauthorized response if not admin
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        return response()->json(['message' => 'no permission'], 403);

    }
    public function profile()
    {
        $user = Auth::user();
        return response()->json([
            'user' => $user->load('roles'),
            'permissions' => $user->getPermissionsViaRoles()->pluck('name'),
        ], 200);
    }
    //auth user name email update
    public function authuserUpdate(Request $request){
            $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
        ]);
        $user = Auth::user();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password ? bcrypt($request->password) : $user->password;
        $user->save();
        return response()->json([
            'user' => $user->load('roles'),
            'message' => 'Auth user updated successfully',
        ], 200);
    }
    //role change
    public function updateRole(Request $request, $id)
    {

       // Find the user by ID
    $user = User::findOrFail($id);

    // Find the role by its ID
    $role = Role::findById($request->role_id, 'api');
    if (!$role) {
        return response()->json(['error' => 'Role not found'], 404);
    }

    // Sync or assign the role to the user
    $user->syncRoles($role->name);

    return response()->json([
        'message' => 'Role assigned successfully',
        'user' => $user->load('roles'),
    ]);
    }

}
