<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     *  Display the profile of the logged-in user.
     */
    public function show(Request $request)
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    /**
     *  Update the profile of the logged-in user.
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'name'  => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email,' . $user->id],
        ]);

        $user->update($data);

        return response()->json([
            'message' => 'Profil erfolgreich aktualisiert.',
            'user'    => $user,
        ]);
    }

    /**
     * Change the password of the logged-in user.
     */
    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'current_password' => ['required'],
            'password' => ['required', 'confirmed'],
        ]);

        if (! Hash::check($data['current_password'], $user->password)) {
            return response()->json([
                'message' => 'Password invalid.',
            ], 422);
        }

        $user->update([
            'password' => bcrypt($data['password']),
        ]);

        return response()->json([
            'message' => 'Password successfully updated.',
        ]);
    }
}
