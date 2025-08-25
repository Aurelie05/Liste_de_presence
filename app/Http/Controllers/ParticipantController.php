<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Participant;
use Illuminate\Support\Facades\Validator;

class ParticipantController extends Controller
{
    public function index()
    {
        return Participant::all();
    }

   
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'required|string|max:20',
            'fonction' => 'required|string|max:255',
            'signature' => 'nullable|string', // Si signature est optionnelle, sinon 'required'
            'meeting_id' => 'required|exists:meetings,id',
        ]);
    
        if ($validator->fails()) {
            \Log::info('Validation errors:', $validator->errors()->toArray());
        
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        
    
        $participant = Participant::create($validator->validated());
    
        return response()->json($participant, 201);
    }
}
