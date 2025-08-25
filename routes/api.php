<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\MeetingController;

Route::middleware('api')->group(function () {
    Route::get('/participants', [ParticipantController::class, 'index']);
    Route::post('/participants', [ParticipantController::class, 'store']);

    Route::post('/meetings', [MeetingController::class, 'store']);
    Route::post('/finish-meeting', [MeetingController::class, 'finish']);
});
