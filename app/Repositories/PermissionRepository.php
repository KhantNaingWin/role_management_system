<?php

namespace App\Repositories;

use App\Interfaces\PermissionInterface;
use App\Models\User;
use App\Models\Admin;
use App\Interfaces\AdminInterface;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;

class PermissionRepository implements PermissionInterface
{

    public function all()
    {

        return Permission::all();
    }

    public function store($request)
    {
        //
    }
    public function edit($id)
    {
        //
    }
    public function update($request, $id)
    {

        //
    }
    public function destroy($id)
    {
       //
    }
}
