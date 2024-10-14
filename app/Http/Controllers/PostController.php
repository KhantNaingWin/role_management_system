<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;

class PostController extends Controller
{
    public function PostCreate(PostRequest $request){
        //
        $post = $request->validated();

        // $post = Post::create($request->all());
    }


}
