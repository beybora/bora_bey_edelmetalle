<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'items' => $request->user()->cartItems()->with('product')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity'   => ['required', 'integer', 'min:1'],
        ]);

        $user = $request->user();

        // Prüfen, ob das Produkt bereits im Warenkorb liegt
        $existingItem = $user->cartItems()->where('product_id', $data['product_id'])->first();

        if ($existingItem) {
            // Wenn ja: Menge erhöhen
            $existingItem->increment('quantity', $data['quantity']);
            return response()->json([
                'message' => 'Cart item updated.',
                'item'    => $existingItem->fresh(),
            ]);
        }

        // Andernfalls: Neues Item anlegen
        $item = $user->cartItems()->create($data);

        return response()->json([
            'message' => 'Item added to cart.',
            'item'    => $item,
        ]);
    }

    public function update(Request $request, $id)
    {
        $item = $request->user()->cartItems()->findOrFail($id);

        $data = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $item->update($data);

        return response()->json([
            'message' => 'Cart item updated.',
            'item'    => $item,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $item = $request->user()->cartItems()->findOrFail($id);
        $item->delete();

        return response()->json([
            'message' => 'Cart item removed.',
        ]);
    }
}
