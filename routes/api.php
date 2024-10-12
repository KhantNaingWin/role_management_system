<?php

use App\Http\Controllers\Api\AdminController;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\AuthenticatedSessionController;


Route::post('/register', [RegisteredUserController::class, 'store']);

Route::post('/login', [AuthenticatedSessionController::class, 'login']);
Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::prefix('users')->group(function(){
        Route::get('/',[UserController::class,'userLists' ]);
    });
    Route::post('/user/create',[AdminController::class,'UserCreate']);
    Route::post('/user/update',[AdminController::class,'UserUpdate']);
    Route::delete('/user/delete/{id}',[AdminController::class,'UserDelete']);
    Route::post('/user/rolechange',[AdminController::class,'userRoleChange']);
});

