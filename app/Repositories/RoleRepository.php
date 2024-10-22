<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Admin;
use App\Interfaces\RoleInterface;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class RoleRepository implements RoleInterface
{

    public function all()
    {

        return Role::all();
    }

    public function store($request)
    {
        $data = new Role();
        $data->name = $request->name;
        $data->save();
    }
    public function edit($id)
    {
        return Role::where('id', $id)->first();
    }
    public function update($request, $id)
    {

        $data = Role::where('id', $id)->first();
        $data->name = $request->name;
        $data->update();
    }
    public function destroy($id)
    {
       return Role::where('id', $id)->delete();
    }
}
