<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::insert([
            ['name' => 'Gold', 'slug' => 'gold', 'visible_in_nav' => true, 'sort_order' => 1],
            ['name' => 'Silber', 'slug' => 'silber', 'visible_in_nav' => true, 'sort_order' => 2],
            ['name' => 'Platin', 'slug' => 'platin', 'visible_in_nav' => true, 'sort_order' => 3],
            ['name' => 'Palladium', 'slug' => 'palladium', 'visible_in_nav' => true, 'sort_order' => 4],
        ]);
    }
}
