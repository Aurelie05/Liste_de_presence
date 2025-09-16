<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\MeetingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

// Page Welcome après scan QR
Route::get('/welcome/{meetingId}', [MeetingController::class, 'show'])->name('welcome.show');

// Dashboard pour créer / lister les meetings
Route::get('/dashboard', [MeetingController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');




Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';



Route::get('/confidentialité', function () {
    return Inertia::render('Pagedeconfidentialité');
});

Route::get('/email', function () {
    return Inertia::render('RegisterEmail');
});

Route::get('/form', function () {
    return Inertia::render('CreationForm');
});

Route::get('/signature', function () {
    return Inertia::render('SignaturePage');
});
Route::get('/success', function () {
    return Inertia::render('Success');

});
Route::get('/dashboard', [App\Http\Controllers\MeetingController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/admincreate', function () {
    return Inertia::render('CreationReuinion');

});
Route::prefix('admin')->middleware(['auth'])->group(function() {
    Route::resource('meetings', MeetingController::class);
    Route::resource('participants', ParticipantController::class);
});

Route::post('/participants', [ParticipantController::class, 'store'])->name('participants.store');

Route::post('/meetings', [MeetingController::class, 'store'])->name('meetings.store');
Route::post('/meetings/{meeting}/finish', [MeetingController::class, 'finish'])->name('meetings.finish');
Route::delete('/meetings/{meeting}', [MeetingController::class, 'destroy'])->name('meetings.destroy');

Route::get('/meetings/{meeting}/participants-list', function ($meetingId) {
    $meeting = \App\Models\Meeting::with('participants')->findOrFail($meetingId);
    return Inertia::render('ListeParticipants', [
        'meeting' => $meeting,
        'participants' => $meeting->participants,
    ]);
})->name('meetings.participants.list');

Route::get('/meetings/{meetingId}/signature', function($meetingId){
    return Inertia::render('SignaturePage', ['meetingId' => $meetingId]);
})->name('meetings.signature');

Route::get('/participants-list', [ParticipantController::class, 'index'])
    ->name('participants.list');

Route::post('/participants/add', [ParticipantController::class, 'addParticipant'])
     ->name('participants.add');
