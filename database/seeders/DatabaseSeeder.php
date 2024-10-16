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

       Role::create(['name' => 'admin'])->givePermissionTo(Permission::all());
       Role::create(['name' => 'editor'])->givePermissionTo(['create','read','update']);
       Role::create(['name' => 'user'])->givePermissionTo('read');


    $user = User::create([
        'name'=>'admin',
        'email'=> 'admin@gmail.com',
        'password'=> bcrypt('admin123')
    ]);

    $user->assignRole('admin');
    }

}
