<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\MeetingFinishedMail;
use App\Models\Meeting;
use PDF;

class MeetingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'fonction' => 'required|string',
            'titre' => 'required|string',
            'heureDebut' => 'required',
        ]);

        $meeting = Meeting::create([
            'nom' => $request->nom,
            'fonction' => $request->fonction,
            'titre' => $request->titre,
            'heure_debut' => $request->heureDebut,
        ]);

        return response()->json($meeting, 201);
    }

    public function finish()
    {
        $meeting = Meeting::latest()->first();
        $meeting->heure_fin = now();
        $meeting->save();

        $pdf = PDF::loadView('pdf.liste', ['participants' => $meeting->participants, 'meeting' => $meeting]);

        foreach ($meeting->participants as $participant) {
            if ($participant->email) {
                Mail::to($participant->email)->send(new MeetingFinishedMail($pdf));
            }
        }

        return response()->json(['message' => 'Réunion terminée, emails envoyés.']);
    }
}
