<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all();

        Product::factory()
            ->count(20)
            ->make()
            ->each(function ($product) use ($categories) {
                $product->category_id = $categories->random()->id ?? null;
                $product->save();
            });
    }
}
