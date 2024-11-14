<?php

namespace App\Interfaces;

interface PostInterface{
    public function all($request);
    public function store($request);
    public function edit($id);
    public function update($request,$id);
    public function destroy($id);
    public function PostLists();

}
