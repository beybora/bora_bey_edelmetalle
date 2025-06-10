<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderDetail;
use App\Models\CartItem;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'phone' => 'nullable|string',
            'address1' => 'required|string',
            'address2' => 'nullable|string',
            'city' => 'required|string',
            'state' => 'nullable|string',
            'zipcode' => 'required|string',
            'country_code' => 'required|string',
        ]);

        return DB::transaction(function () use ($user, $data) {
            $cartItems = CartItem::where('user_id', $user->id)->with('product')->get();
            if ($cartItems->isEmpty()) {
                return response()->json(['message' => 'Cart is empty.'], 400);
            }

            $total = $cartItems->sum(fn($item) => $item->product->price * $item->quantity);

            $order = Order::create([
                'total_price' => $total,
                'status' => 'pending',
                'created_by' => $user->id,
            ]);

            foreach ($cartItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'unit_price' => $item->product->price,
                ]);
            }

            $order->details()->create([...$data, 'order_id' => $order->id]);

            CartItem::where('user_id', $user->id)->delete();

            return response()->json(['message' => 'Order placed', 'order_id' => $order->id]);
        });
    }

    public function index(Request $request)
    {
        $orders = Order::with('items.product')->where('created_by', $request->user()->id)->latest()->get();
        return response()->json($orders);
    }

    public function show($id, Request $request)
    {
        $order = Order::with('items.product', 'details')
            ->where('id', $id)
            ->where('created_by', $request->user()->id)
            ->firstOrFail();

        return response()->json($order);
    }

    public function cancel($id, Request $request)
    {
        $order = Order::where('id', $id)->where('created_by', $request->user()->id)->firstOrFail();
        if ($order->status !== 'pending') {
            return response()->json(['message' => 'Cannot cancel this order'], 403);
        }

        $order->status = 'cancelled';
        $order->save();

        return response()->json(['message' => 'Order cancelled']);
    }

    public function getNotifications(Request $request)
    {
        $notifications = $request->user()->notifications()
            ->latest()
            ->take(10)
            ->get();

        return response()->json($notifications);
    }

    public function markNotificationAsRead($id, Request $request)
    {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->is_read = true;
        $notification->save();

        return response()->json(['message' => 'Notification marked as read']);
    }

    public function markAllNotificationsAsRead(Request $request)
    {
        $request->user()->notifications()->update(['is_read' => true]);
        return response()->json(['message' => 'All notifications marked as read']);
    }
}
