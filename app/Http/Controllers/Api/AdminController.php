<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function UserCreate(Request $request){

        $this->validationCheck($request);
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->string('password')),
        ]);
        $user->assignRole('user');

        return response()->json([
            'user'=>$user->load('roles'),
    ],200);
    }
    public function UserUpdate(Request $request){
            $this->validationCheck($request);
            $id = $request->id;
            $user = User::where('id',$request->id)->first();
            $user->update([
                'name'=> $request->name,
                'email'=> $request->email,
                'password'=> Hash::make( $request->password),
            ]);

            // $user->update();
            $user->assignRole('user');
            return response()->json([
                'user'=>$user->load('roles'),
                'status' => 'success',
        ],200);
    }
    public function UserDelete($id){
        $user = User::where('id',$id)->first();
        $user->delete();
        return response()->json([
            'user'=>$user,
            'status'=> 'delete success',
        ]);
    }
    public function userRoleChange(Request $request){
        $user= User::where('id',$request->id)->first();
        $user->update([
            'name'=> $user->name,
            'email'=> $user->email,
            'password'=> Hash::make( $user->password),
        ]);
        $user->assignRole($request->role);
        return response()->json([
            'user'=>$user,
            'status'=> 'Role change success',
        ]);
    }

    protected function validationCheck($request){
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required'],
        ]);
    }
}
