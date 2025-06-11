<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['total_price', 'status', 'created_by'];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function details()
    {
        return $this->hasOne(OrderDetail::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
