<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Interfaces\RoleInterface;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;

class RoleController extends Controller
{
    public function __construct(private RoleInterface $roleInterface )
    {

    }
    public function index(Request $request)
    {
        $roles = $this->roleInterface->all($request);
        $permissions = $roles->pluck('permissions');
        return response()->json([
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $role = $this->roleInterface->store($request);
        return response()->json($role,200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = $this->roleInterface->show($id);
        return response()->json($role,200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $role = $this->roleInterface->edit($id);
        return response()->json($role,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $role = $this->roleInterface->update($request,$id);
        return response()->json($role,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = $this->roleInterface->destroy($id);
        return response()->json($role,200);
    }
    //get all roles
    public function getRoles(){
        $roles = Role::all();
        return response()->json([
            'roles' => $roles,
        ]);
    }

}
