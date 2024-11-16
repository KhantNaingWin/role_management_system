<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Admin;
use App\Interfaces\RoleInterface;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class RoleRepository implements RoleInterface
{

    public function all($request)
    {

       if($request->per_page == -1){
        $roles = Role::paginate();
        return $roles;

       }else{
        return Role::paginate($request->per_page);
       }
    }

    public function store($request)
    {
        $request->validate([
            "name" => "required",
        ]);
        $data = new Role();
        $data->name = $request->name;
        $data->save();
        $data->syncPermissions($request->permissions);
        return $data->load('permissions');

    }
    public function edit($id)
    {
        $data = Role::where('id', $id)->with('permissions')->first();

        $data->selected_permission_list = $data->permissions->pluck('name');

        return $data;
    }
    public function update($request, $id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'permissions' => 'array',
            'permissions.*' => 'string',
        ]);
        // Find the role by ID
        $role = Role::findOrFail($id);

        // Update the role name
        $role->name = $validatedData['name'];
        $role->save();
        if (isset($validatedData['permissions'])) {
            $role->syncPermissions($validatedData['permissions']);
        }

        return response()->json(['message' => 'Role and permissions updated successfully']);
    }
    public function destroy($id)
    {
        return Role::where('id', $id)->delete();
    }
    public function show($id)
    {
        $data = Role::where('id', $id)->first();
        $data->load('permissions');
        return $data;
    }
}
