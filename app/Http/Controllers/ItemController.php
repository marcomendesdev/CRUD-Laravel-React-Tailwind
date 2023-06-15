<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;
use Illuminate\Support\Facades\Auth;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ItemResource::collection(Item::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request)
    {
        $validatedData = $request->validated();
        $user = Auth::user();
        $item = new Item([
            'user_id' => $user->id,
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'image' => $validatedData['image'],
        ]);

        $item->image = $request->file('image')->store('images', 'public');
        $item->image = asset('storage/' . $item->image);
        $item->save();

        return new ItemResource($item);

        // return response(['item' => $item, 'message' => 'Item created'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        $user = Auth::user();
        $item = Item::where('user_id', $user->id)->get();
        return ItemResource::collection($item);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        // update item and image
        $validatedData = $request->validated();
        $item->update($validatedData);
        $item->image = $request->file('image')->store('images', 'public');
        $item->image = asset('storage/' . $item->image);
        $item->save();

        return new ItemResource($item);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        $item->delete();

        return response(['message' => 'Item deleted']);
    }
}
