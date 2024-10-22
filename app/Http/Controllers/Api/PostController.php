<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Interfaces\PostInterface;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function __construct(private PostInterface $postInterface)
    {

    }
    public function index()
    {
        $posts = $this->postInterface->all();
        if ($posts) {
            return response()->json($posts);
    }else{
        return response()->json(["message"=> "no post data"],404);
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
    public function store(PostRequest $request)
    {

       $post = $this->postInterface->store($request);
       return response()->json([
        'message' => 'Post created successfully',
        'post' => $post
    ], 201);
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
        $post = $this->postInterface->edit($id);
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = $this->postInterface->update($request, $id);
        return response()->json([
            'message' => 'Post updated successfully',
            $post
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->postInterface->destroy($id);
        return response()->json(['message' => 'Post deleted successfully']);
    }
    public function postLists(){
        $posts = $this->postInterface->PostLists();
        if($posts){
            return response()->json($posts);
        }else{
            return response()->json(["message"=> "no post data"],404);
        }
    }
}
