<?php

namespace App\Repositories;

use App\Interfaces\PostInterface;
use App\Models\User;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class PostRepository implements PostInterface
{

    public function all()
    {

        return User::all();
    }

    public function store($request)
    {
        $data = new Admin();
        $data->name = $request->name;
        $data->email = $request->email;
        $data->password = Hash::make($request->password);
        $data->save();
    }
    public function edit($id)
    {
        return Admin::where('id', $id)->first();
    }
    public function update($request, $id)
    {

        $data = Admin::where('id', $id)->first();
        if ($data->password != null) {
            $data->name = $request->name;
            $data->email = $request->email;
            $data->password =  Hash::make($request->password);
            $data->update();
        }
    }
    public function destroy($id)
    {
        Admin::where('id', $id)->delete();
    }
}
