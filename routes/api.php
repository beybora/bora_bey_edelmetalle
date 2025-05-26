<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Shop\ShopAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum', 'admin')->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::resource('/products', ProductController::class);
});

Route::get('/shop/products', [ProductController::class, 'index']);

Route::post('login', [AuthController::class, 'login']);


Route::prefix('shop')->group(function () {
    Route::post('login', [ShopAuthController::class, 'login']);
    Route::post('register', [ShopAuthController::class, 'register']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('user', [ShopAuthController::class, 'getUser']);
        Route::post('logout', [ShopAuthController::class, 'logout']);
    });
});
