<?php

use App\Http\Controllers\CandidatsController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MoniteursController;
use App\Http\Controllers\SeancesController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\UtilisateursController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/utilisateurs',[UtilisateursController::class,'index']);
//Route::post('/login',[UtilisateursController::class,'login']);
Route::post('/login',[LoginController::class,'login']);
Route::post('/logout',[LoginController::class,'logout']);
//Route::post('/register',[UtilisateursController::class,'register']);
Route::post('/signup',[LoginController::class,'signup']);
Route::get('/moniteurs',[MoniteursController::class,'index']);
Route::get('/services',[ServicesController::class,'index']);
Route::post('/enregistresecances',[SeancesController::class,'enregistresecances']);
Route::get('/candidats',[CandidatsController::class,'index']);
Route::get('/seances',[SeancesController::class,'index']);
Route::put('/seances/{seance}', [SeancesController::class,'updateStatus']);
Route::put('/utilisateursUpdate/{id}', [UtilisateursController::class, 'updatee']);
Route::delete('/utilisateurs/{id}', [UtilisateursController::class, 'destroy']);
Route::post('/utilisateurs', [UtilisateursController::class, 'store']);
Route::get('/utilisateurs/{id}', [UtilisateursController::class, 'show']);
Route::get('/utilisateurs/{id}/payment-status', [UtilisateursController::class, 'getPaymentStatus']);
Route::put('/utilisateurs/{id}/payment-status', [UtilisateursController::class, 'updatePaymentStatus']);
Route::get('/utilisateurs/{id}/montant-status', [UtilisateursController::class, 'getMontantStatus']);
Route::put('/utilisateurs/{id}/montant-status', [UtilisateursController::class, 'updateMontantStatus']);
Route::get('/services/{id}', [ServicesController::class, 'show']);
Route::put('/services/{id}', [ServicesController::class, 'update']);
Route::delete('/services/{id}', [ServicesController::class, 'destroy']);
Route::post('/services', [ServicesController::class, 'store']);
Route::get('/candidats/{username}', [CandidatsController::class, 'getInformationsByUsername']);
