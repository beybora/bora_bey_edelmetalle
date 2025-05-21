<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        $credentials = $request->validate(
            [
                'email' => ['required', 'email'],
                'password' => 'required',
            ]
        );

        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response()->json(['message' => 'Login failed'], 422);
        }

        $user = Auth::user();

        if (!$user->is_admin) {
            Auth::logout();

            return response([
                'message' => 'You are not authorized to login as an admin',
            ], 403);
        }

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user,
        ]);
    }


    public function logout()
    {
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response('Logged out successfully', 204);
    }
}
