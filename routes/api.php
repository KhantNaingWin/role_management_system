<?php

use App\Http\Controllers\Api\PermissionController;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\AuthenticatedSessionController;


Route::post('/register', [RegisteredUserController::class, 'store']);

Route::post('/login', [AuthenticatedSessionController::class, 'login'])->name('login');
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'logout']);
    Route::resource('/admin', AdminController::class);
    Route::resource('/post', PostController::class);
    Route::resource('/role', RoleController::class);
    Route::resource('/permission', PermissionController::class);
    Route::get('/users', [UserController::class, 'userLists']);
    Route::get('/posts', [PostController::class, 'postLists']);
    Route::get('/login/profile', [UserController::class, 'profile']);
    Route::patch('/users/rolechange/{id}', [UserController::class, 'updateRole']);
    Route::put('/authuser/update', [UserController::class, 'authuserUpdate']);
    Route::get("/roles",[RoleController::class,'getRoles']);

});

