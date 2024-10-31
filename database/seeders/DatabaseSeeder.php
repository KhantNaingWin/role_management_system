<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Permission::create(['name' => 'create']);
        Permission::create(['name' => 'read']);
        Permission::create(['name' => 'update']);
        Permission::create(['name' => 'delete']);
        Permission::create(['name'=> 'post_create']);
        Permission::create(['name'=> 'post_read']);
        Permission::create(['name'=> 'update_post']);
        Permission::create(['name'=> 'delete_post']);


       Role::create(['name' => 'admin'])->givePermissionTo(Permission::all());
       Role::create(['name' => 'editor'])->givePermissionTo(['read','update','post_read','post_create','update_post','delete_post']);
       Role::create(['name' => 'user'])->givePermissionTo(['read','post_read']);


    $user = User::create([
        'name'=>'admin',
        'email'=> 'admin@gmail.com',
        'password'=> bcrypt('admin123')
    ]);

    $user->assignRole('admin');
    }

}
