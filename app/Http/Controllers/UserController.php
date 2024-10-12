<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function userLists(Request $request){
         // Assuming the user is authenticated and admin
         $user = $request->user();

         // Check if the user has the 'admin' role
         if ($user->hasRole('admin')) {
             // Fetch all roles (or just user roles as needed)
             $roles = $user->roles;
             $allusers = User::all()->load('roles');

             // Return roles in a JSON response
             return response()->json([
                 'success' => true,
                 'roles' => $roles,
                 'userlist' => $allusers
             ]);
         }

         // Return an unauthorized response if not admin
         return response()->json(['error' => 'Unauthorized'], 403);

    }
}
