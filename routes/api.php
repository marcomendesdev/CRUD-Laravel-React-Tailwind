<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(static function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::get('/users', function () {
        $users = User::all();
        $userCollection = new ResourceCollection($users, UserResource::class);
        return $userCollection;
    });
    
    Route::get('/items', [ItemController::class, 'index']);
    Route::post('/add-item/{id}', [ItemController::class, 'store']);
    Route::post('/update/{item}', [ItemController::class, 'update']);
    Route::get('/user-items', [ItemController::class, 'show']);
    Route::delete('/delete/{item}', [ItemController::class, 'destroy']);
    Route::post('/logout', [AuthController::class, 'logout']);
});


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
