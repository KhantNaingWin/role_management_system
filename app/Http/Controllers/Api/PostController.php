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
    public function index(Request $request)
    {
        if(auth()->user()->can("post_read")){
            $posts = $this->postInterface->all($request);
        if ($posts) {
            return response()->json($posts);
    }else{
        return response()->json(["message"=> "no post data"],404);
    }
        }
        return response()->json(["message"=> "no permission"]);
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

       if(auth()->user()->can("post_create")){
        $post = $this->postInterface->store($request);
       return response()->json([
        'message' => 'Post created successfully',
        'post' => $post
    ], 201);
       }
       return response()->json(["message"=> "no permission"]);

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
        if(auth()->user()->can('post_read')){
            $post = $this->postInterface->edit($id);
        return response()->json($post);
        }
        return response()->json(["message"=> "no permission"]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
       if(auth()->user()->can('update_post')){
        $post = $this->postInterface->update($request, $id);
        return response()->json([
            'message' => 'Post updated successfully',
            $post
        ], 200);
       }
       return response()->json(["message"=> "no permission"]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(auth()->user()->can('delete_post')){
            $this->postInterface->destroy($id);
        return response()->json(['message' => 'Post deleted successfully']);
        }
        return response()->json(["message"=> "no permission"]);

    }
    public function postLists(){
        if(auth()->user()->can('post_read')){
            $posts = $this->postInterface->PostLists();
        if($posts){
            return response()->json($posts);
        }else{
            return response()->json(["message"=> "no post data"],404);
        }
        }
        return response()->json(["message"=> "no permission"]);

    }
}
