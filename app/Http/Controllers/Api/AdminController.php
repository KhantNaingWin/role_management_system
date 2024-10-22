<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Interfaces\AdminInterface;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    public function __construct(private AdminInterface $adminInterface )
    {

    }
    public function index()
    {
        $admins=$this->adminInterface->all();
        $admins->load('roles');
        if($admins){
            return response()->json($admins);
        }else{
            return response()->json(["message"=> "no admin data"],404);
        }
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
       $data = $this->adminInterface->store($request);
       return response()->json([
        "message"=> "Create successfully",
        $data
       ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
       $user = $this->adminInterface->edit($id);
       $user->load('roles');
       if($user){
        return response()->json([
           $user,
        ]);
       }else{
        return response()->json([
            'message'=> 'User not found'
        ],404);
    }
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $this->adminInterface->update( $request,$id);
        return response()->json([
            'message' => 'User updated successfully',
            'data' => $data
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
       $this->adminInterface->destroy($id);
        return response()->json([
            'message'=> 'Deleted'
        ]);
    }
}
