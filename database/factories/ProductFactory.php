<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->words(3, true),
            'description' => $this->faker->sentence(),
            'image' => $this->faker->imageUrl(640, 480),
            'image_mime' => 'image/png',
            'price' => $this->faker->randomFloat(2, 78, 1200),
            'image_size' => $this->faker->numberBetween(10000, 500000),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
