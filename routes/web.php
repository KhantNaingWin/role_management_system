<?php

use Illuminate\Support\Facades\Route;


Route::get('/{any}', function () {
    return view('layouts.layout');
})->where('any', '.*');
