<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        // Gibt alle Bestellungen mit User, Items und Details zurück
        $orders = Order::with(['user', 'items.product', 'details'])->latest()->get();
        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::with(['user', 'items.product', 'details'])->findOrFail($id);
        return response()->json($order);
    }
}
