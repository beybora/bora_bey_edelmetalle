<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\User;
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

    public function getShopUsers()
    {
        $users = User::where('is_admin', false)
            ->withCount('orders')
            ->get(['id', 'name', 'email']);

        foreach ($users as $user) {
            $user->cart_items_count = $user->cartItems()->sum('quantity');
        }

        return response()->json($users);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $data = $request->validate([
            'is_active' => ['required', 'boolean'],
        ]);
        $user->update($data);
        // Wenn der User deaktiviert wurde, alle Tokens löschen
        if (array_key_exists('is_active', $data) && $data['is_active'] === false) {
            $user->tokens()->delete();
        }
        return response()->json($user);
    }
}
