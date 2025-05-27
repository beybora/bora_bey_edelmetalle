<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Shop\ShopAuthController;
use App\Http\Controllers\Shop\UserController as ShopUserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin API
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::resource('/products', ProductController::class);
});

/*
|--------------------------------------------------------------------------
| Shop API – Öffentlich
|--------------------------------------------------------------------------
*/
Route::prefix('shop')->group(function () {
    Route::post('/login', [ShopAuthController::class, 'login']);
    Route::post('/register', [ShopAuthController::class, 'register']);

    // Öffentliche Produktliste
    Route::get('/products', [ProductController::class, 'index']);

    /*
    |--------------------------------------------------------------------------
    | Shop API – Geschützt
    |--------------------------------------------------------------------------
    */
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [ShopAuthController::class, 'getUser']);
        Route::post('/logout', [ShopAuthController::class, 'logout']);

        // User-Profile
        Route::get('/user/profile', [ShopUserController::class, 'show']);
        Route::put('/user/profile', [ShopUserController::class, 'updateProfile']);
        Route::put('/user/password', [ShopUserController::class, 'updatePassword']);
    });
});
