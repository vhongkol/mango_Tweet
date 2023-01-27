<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ReactionsController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// PUBLIC ROUTES
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/forgot-password', [PasswordController::class, 'sendEmailRequest']);
Route::post('/otp-reset-password', [PasswordController::class, 'updatePasswordWithOTP']); 

// TODO RESET PASSWORD LINK ONLY

Route::group(['middleware' => ['auth:sanctum']], function() {    

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/posts', PostsController::class);    
    Route::apiResource('/comments', CommentsController::class);    
    Route::apiResource('/reactions', ReactionsController::class);
    Route::delete('/reactions', [ReactionsController::class, 'destroy']);

        
    Route::get('/posts-image/{path}', [PostsController::class, 'getImage'])->where('path', '.*');
    
    // // TODO
    // Route::get('/users-image/{path}', [PostsController::class, 'getImage']);

    Route::get('/posts-reaction-list/{post}', [PostsController::class, 'reactionList']);
    Route::get('/comments-reaction-list/{post}', [CommentsController::class, 'reactionList']);


    // TODO
    // Route::apiResource('/reaction-type', ReactionTypeController::class);
}); 
