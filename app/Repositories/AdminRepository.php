<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Admin;
use App\Interfaces\AdminInterface;
use Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class AdminRepository implements AdminInterface
{

    public function all($request)
    {

        return User::where('id', '!=', auth()->id())->paginate($request->per_page);
    }

    public function store($request)
    {
        // dd($request);
        $data = new User();
        $data->name = $request->name;
        $data->email = $request->email;
        $data->password = $request->password !== 'undefined' ? Hash::make($request->password) : null;
        // Assign the roles to the user
    if ($request->role) {
        $data->assignRole($request->role);
    }
        $data->save();
        return $data;
    }
    public function edit($id)
    {
      return User::find($id);
    }
    public function update($request, $id)
    {
    $data = User::findOrFail($id);
    $data->name = $request->name;
    $data->email = $request->email;

    if (!empty($request->password)) {
        $data->password = Hash::make($request->password);
    }
    return $data->update();
}
    public function destroy($id)

    {
        User::where('id', $id)->delete();
    }
}
