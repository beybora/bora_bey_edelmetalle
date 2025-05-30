<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        $metal = $this->faker->randomElement(['Gold', 'Silber', 'Platin']);
        $name = "{$metal} " . $this->faker->word();

        return [
            'title' => $name,
            'description' => "Feines {$metal} zur Geldanlage oder als Geschenk.",
            'image' => $this->faker->imageUrl(640, 480, 'business', true, 'edelmetalle'),
            'image_mime' => 'image/jpeg',
            'price' => $this->faker->randomFloat(2, 78, 1200),
            'image_size' => $this->faker->numberBetween(10000, 500000),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
