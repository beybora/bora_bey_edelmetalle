<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition()
    {
        return [
            'total_price' => $this->faker->randomFloat(2, 100, 2000),
            'status' => $this->faker->randomElement(['pending', 'approved', 'shipped', 'delivered', 'cancelled']),
            'created_by' => User::factory(),
        ];
    }
}
