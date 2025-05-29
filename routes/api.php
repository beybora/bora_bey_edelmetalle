<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Shop\CartController;
use App\Http\Controllers\Shop\ShopAuthController;
use App\Http\Controllers\Shop\UserController as ShopUserController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Shop\CategoryController as ShopCategoryController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin API
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {
    // Öffentliche Admin-Routen (Login)
    Route::post('/login', [AuthController::class, 'login']);

    //Geschützte Admin-Routen
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::get('/user', [AuthController::class, 'getUser']);
        Route::post('/logout', [AuthController::class, 'logout']);

        // Produkte
        Route::resource('/products', ProductController::class);

        // Kategorien
        Route::apiResource('/categories', AdminCategoryController::class);
    });
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
    Route::get('/products/{product}', [ProductController::class, 'show']);

    // Kategorien öffentlich
    Route::get('/categories', [ShopCategoryController::class, 'index']);

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

        // Cart Management
        Route::get('/cart', [CartController::class, 'index']);
        Route::post('/cart', [CartController::class, 'store']);
        Route::put('/cart/{id}', [CartController::class, 'update']);
        Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    });
});


// Globa Healthcheck
Route::get('/ping', function () {
    return response()->json(['status' => 'ok']);
});
