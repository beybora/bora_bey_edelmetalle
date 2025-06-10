<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Notification;
use Illuminate\Support\Facades\DB;

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

    public function updateStatus($id, Request $request)
    {
        $request->validate([
            'status' => 'required|in:approved,shipped,delivered,cancelled'
        ]);

        return DB::transaction(function () use ($id, $request) {
            $order = Order::findOrFail($id);
            $oldStatus = $order->status;
            $newStatus = $request->status;

            $order->status = $newStatus;
            $order->save();

            // Create notification for customer
            Notification::create([
                'user_id' => $order->created_by,
                'type' => 'order_status',
                'title' => 'Order Status Updated',
                'message' => "Your order #{$order->id} status has been updated from {$oldStatus} to {$newStatus}",
                'data' => [
                    'order_id' => $order->id,
                    'old_status' => $oldStatus,
                    'new_status' => $newStatus
                ]
            ]);

            return response()->json([
                'message' => 'Order status updated successfully',
                'order' => $order->fresh(['user', 'items.product', 'details'])
            ]);
        });
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
