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

        $imageUrls = [
            "https://picsum.photos/id/10/400/300",
            "https://picsum.photos/id/20/400/300",
            "https://picsum.photos/id/30/400/300",
            "https://picsum.photos/id/40/400/300",
            "https://picsum.photos/id/50/400/300",
            "https://picsum.photos/id/60/400/300",
            "https://picsum.photos/id/70/400/300",
            "https://picsum.photos/id/80/400/300",
            "https://picsum.photos/id/90/400/300",
            "https://picsum.photos/id/100/400/300",
            "https://picsum.photos/id/110/400/300",
            "https://picsum.photos/id/120/400/300",
            "https://picsum.photos/id/130/400/300",
            "https://picsum.photos/id/140/400/300",
            "https://picsum.photos/id/150/400/300",
            "https://picsum.photos/id/160/400/300",
            "https://picsum.photos/id/170/400/300",
            "https://picsum.photos/id/180/400/300",
            "https://picsum.photos/id/190/400/300",
            "https://picsum.photos/id/200/400/300",
        ];

        Product::factory()
            ->count(20)
            ->make()
            ->each(function ($product, $index) use ($categories, $imageUrls) {
                $product->category_id = $categories->random()->id ?? null;
                $product->image = $imageUrls[$index];
                $product->save();
            });
    }
}
