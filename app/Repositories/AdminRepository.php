<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Admin;
use App\Interfaces\AdminInterface;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class AdminRepository implements AdminInterface
{

    public function all()
    {

        return User::all()->except(auth()->id());
    }

    public function store($request)
    {
        $data = new User();
        $data->name = $request->name;
        $data->email = $request->email;
        $data->password = $request->password !== 'undefined' ? Hash::make($request->password) : null;
        // Assign the roles to the user
    if ($request->role) {
        $data->assignRole($request->role);
    }
        $data->save();
    }
    public function edit($id)
    {
      return User::find($id);
    }
    public function update($request, $id)
    {
    $data = User::find($id);
    $data->name = $request->name;
    $data->email = $request->email;

    if (!empty($request->password)) {
        $data->password = Hash::make($request->password);
    }

    if ($request->roles) {
        $data->syncRoles($request->roles);
    } else {
        $data->roles()->detach();
    }

    // Save the changes
    $data->update();
}
    public function destroy($id)

    {
        User::where('id', $id)->delete();
    }
}
