<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Participant;
use Illuminate\Support\Facades\Validator;

class ParticipantController extends Controller
{
    // Ajouter un participant
    public function store(Request $request)
{
    $meeting = \App\Models\Meeting::findOrFail($request->meeting_id);

    // Vérifie si la réunion est close uniquement via status
    if ($meeting->status === 'closed') {
        return response()->json([
            'error' => 'Les inscriptions pour cette réunion sont fermées.'
        ], 403);
    }


    // Validation + création du participant
    $validator = Validator::make($request->all(), [
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'fonction' => 'required|string|max:255',
        'email' => 'nullable|email|max:255',
        'signature' => 'nullable|string',
        'meeting_id' => 'required|integer|exists:meetings,id',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors(),
        ], 422);
    }

    $participant = Participant::create($validator->validated());

    return response()->json($participant, 201);
}


    public function index()
{
    $meetings = \App\Models\Meeting::with('participants')->get();

    return inertia('ListeParticipants', [
        'meetings' => $meetings,
    ]);
    
}
public function addParticipant(Request $request)
{
    $validator = Validator::make($request->all(), [
        'meeting_id' => 'required|exists:meetings,id',
        'nom'        => 'required|string|max:255',
        'prenom'     => 'required|string|max:255',
        'fonction'   => 'required|string|max:255',
        'email'      => 'nullable|email|max:255',
        'admin_signature' => 'required|string', // 🔹 récupère la signature
    ]);

    if ($validator->fails()) {
        return redirect()->back()->withErrors($validator)->withInput();
    }

    Participant::create([
        'meeting_id' => $request->meeting_id,
        'nom'        => $request->nom,
        'prenom'     => $request->prenom,
        'fonction'   => $request->fonction,
        'email'      => $request->email,
        'signature'  => $request->admin_signature, // 🔹 ici dans le champ signature
    ]);

    return redirect()->back()->with('success', 'Participant ajouté avec succès.');
}


}
