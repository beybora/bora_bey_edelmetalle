<?php

namespace App\Http\Controllers\Shop;

use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::where('visible_in_nav', true)
            ->orderBy('sort_order')
            ->limit(4)
            ->get(['id', 'name', 'slug']);

        return response()->json($categories);
    }
}
