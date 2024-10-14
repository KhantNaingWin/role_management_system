<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\LoginRequest;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function login(Request $request){
        $request->validate([
           'email' => ['required','email'],
            'password' => ['required'],
        ]);
        $data=User::where('email',$request->email)->first();

        if (!$data) {
            return response()->json([
                'message' => 'Invalid email or password',
                'user' => null,
                'token' => null
            ], 401); // 401 Unauthorized
        }
        if (Hash::check($request->password,$data->password)) {
            return response()->json([
                'message' => 'Login successful',
                'authenticated' => true,
                'user'=>$data->load('roles'),

                'token'=>$data->createToken(time())->plainTextToken
            ],200);
        }else{
            return response()->json([
                'message' => 'Invalid email or password',
                'user' => null,
                'token' => null
            ],401);
        }

    }
}
