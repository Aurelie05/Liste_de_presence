<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MeetingAudio; // nouveau modèle pour stocker les audios

class MeetingAudioController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'meeting_id' => 'required|exists:meetings,id',
            'audio' => 'required|file|mimes:mp3,wav,ogg',
        ]);

        $path = $request->file('audio')->store('audios', 'public');

        $audio = \App\Models\MeetingAudio::create([
            'meeting_id' => $request->meeting_id,
            'file_path' => $path,
        ]);

        // Optionnel : ici tu peux appeler ton service d'IA pour transcription
        // dispatch(new ProcessAudioForMeetingReport($audio));

        return response()->json(['success' => true, 'audio_id' => $audio->id]);
    }
}
