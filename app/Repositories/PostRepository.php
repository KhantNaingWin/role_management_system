<?php

namespace App\Repositories;

use App\Models\Post;
use App\Models\Admin;
use App\Interfaces\PostInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class PostRepository implements PostInterface
{

    public function all($request)
    {

        $perPage = $request->input('per_page', $request->per_page);
        $page = $request->input('page', $request->page);
        $sortBy = $request->input('sort_by', 'title');
        $sortDesc = $request->input('sort_desc', false);

        // Create a base query
        $query = Post::query();

        // Apply sorting
        $query->orderBy($sortBy, $sortDesc === 'true' ? 'desc' : 'asc');

        // Apply pagination
       if($perPage == -1){
        $posts = $query->get();
        return [
            'data'=> $posts,
            'current_page' => $page,
            'per_page' => $perPage,
            'total' => $posts->count(),
        ];
       }else{
        $posts = $query->paginate($perPage, ['*'], 'page', $page);
        return $posts;

       }
    }

    public function store($request)
    {
        $request->validated();
        $post = new Post();
        $post->title = $request->title;
        $post->description = $request->description;
        if ($request->hasFile('image')) {
            // Store the image in the 'public/images' directory
            $imagePath = $request->file('image')->getClientOriginalName();
           $request->file('image')->storeAs('public/images', $imagePath);
            $post->image = $imagePath;
        }
        $post->save();
        return $post;



    }
    public function edit($id)
    {
        return Post::find($id);
    }
    public function update($request, $id)
    {

        $data = Post::where('id', $id)->first();
        $data->title = $request->title;
        $data->description = $request->description;
        if ($request->hasFile('image')) {
            // Store the image in the 'public/images' directory
            $imagePath = $request->file('image')->getClientOriginalName();
           $request->file('image')->storeAs('public/images', $imagePath);
            $data->image = $imagePath;
        }
        $data->update();
    }
    public function destroy($id)
    {
       return  Post::where('id', $id)->delete();
    }
    public function PostLists(){
        return Post::all();
    }
}
