<?php

namespace Database\Seeders;

use App\Http\Middleware\Admin;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
        ]);

        // Beispiel-User mit Bestellungen und CartItems
        \App\Models\User::factory()
            ->count(3)
            ->create()
            ->each(function ($user) {
                // Jeder User bekommt 2 Bestellungen mit je 2 OrderItems
                \App\Models\Order::factory()
                    ->count(2)
                    ->create(['created_by' => $user->id])
                    ->each(function ($order) {
                        \App\Models\OrderItem::factory()->count(2)->create(['order_id' => $order->id]);
                    });
                // Jeder User bekommt 2 CartItems
                \App\Models\CartItem::factory()->count(2)->create(['user_id' => $user->id]);
            });

        // Deaktivierte User
        \App\Models\User::factory()->count(2)->create(['is_active' => false]);

        // Test User
        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
