<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'visible_in_nav',
        'sort_order',
    ];
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
