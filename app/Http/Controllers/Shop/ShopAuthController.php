<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShopAuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => 'required',
        ]);

        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response()->json(['message' => 'Login fehlgeschlagen'], 422);
        }

        $user = Auth::user();

        $token = $user->createToken('shop')->plainTextToken;

        return response([
            'message' => 'Login erfolgreich',
            'token' => $token,
            'user' => new UserResource($user),
        ]);
    }

    public function logout()
    {
        $user = Auth::user();

        if ($user?->currentAccessToken()) {
            $user->currentAccessToken()->delete();
        }

        return response('Logout erfolgreich', 204);
    }

    public function getUser(Request $request)
    {
        return new UserResource($request->user());
    }
}
