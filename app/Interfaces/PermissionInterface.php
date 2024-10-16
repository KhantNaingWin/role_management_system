<?php

namespace App\Interfaces;

interface PermissionInterface{
    public function all();
    public function store($request);
    public function edit($id);
    public function update($request,$id);
    public function destroy($id);

}
