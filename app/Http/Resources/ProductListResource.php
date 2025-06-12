<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price,
            'image' => $this->image,
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d') : null,
            'category' => $this->category ? $this->category->name : null,
            'category_id' => $this->category_id,
        ];
    }
}
