<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function userLists(Request $request){
         // Assuming the user is authenticated and admin
        if(auth()->user()->can("read")){
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
    public function profile(){
        $user = Auth::user();
        return response()->json([
            'user'=>$user->load('roles'),
        ],200);
    }
}
