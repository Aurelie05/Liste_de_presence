<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\MeetingFinishedMail;
use App\Models\Meeting;
use PDF;
use Inertia\Inertia;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Writer;



class MeetingController extends Controller
{
    // Création d'une réunion
    public function store(Request $request)
{
    // Validation
    $validator = Validator::make($request->all(), [
        'nom' => 'required|string|max:255',
        'lieu' => 'required|string|max:255',
        'start_time' => 'required|date_format:H:i',
        'end_time' => 'required|date_format:H:i|after:start_time',
    ]);

    if ($validator->fails()) {
        return back()->withErrors($validator)->withInput();
    }

    $validated = $validator->validated();

    $today = now()->format('Y-m-d');
    $startDateTime = $today . ' ' . $validated['start_time'];
    $endDateTime   = $today . ' ' . $validated['end_time'];

    // Création de la réunion
    $meeting = Meeting::create([
        'nom' => $validated['nom'],
        'lieu' => $validated['lieu'],
        'start_time' => $startDateTime,
        'end_time' => $endDateTime,
        'user_id' => auth()->id(),
    ]);

    // Lien vers la réunion
    $url = route('welcome.show', $meeting->id);

    // Génération QR code en SVG
    $renderer = new ImageRenderer(
        new RendererStyle(400),
        new SvgImageBackEnd()
    );

    $writer = new Writer($renderer);
    $qrCodeSvg = $writer->writeString($url);

    // ✅ Stockage en session via flash
    return redirect()
        ->route('meetings.index') // Redirection vers Dashboard / liste
        ->with('success', 'Réunion créée avec succès!')
        ->with('qr_code_svg', $qrCodeSvg)
        ->with('meeting_id', $meeting->id);
}


    // Affichage des participants d'une réunion
    public function participants(Meeting $meeting)
    {
        $meeting->load('participants');

        // Retourne les données en JSON pour React
        return response()->json([
            'meeting' => $meeting,
            'participants' => $meeting->participants,
        ]);
    }

    public function finish(Meeting $meeting)
    {
        $meeting->status = 'closed';
        $meeting->save();
    
        // Générer le PDF
        $pdf = Pdf::loadView('pdf.liste', [
            'participants' => $meeting->participants,
            'meeting' => $meeting
        ]);
    
        // Mail au créateur
        if ($meeting->creator && !empty($meeting->creator->email)) {
            Mail::to($meeting->creator->email)
                ->send(new MeetingFinishedMail($pdf, $meeting));
        }
    
        // Mail à tous les participants
        foreach ($meeting->participants as $participant) {
            if (!empty($participant->email)) {
                Mail::to($participant->email)
                    ->send(new \App\Mail\ParticipantMeetingFinishedMail($meeting, $participant));
            }
        }
        
    
        return redirect()->route('participants.list')
            ->with('success', 'Réunion terminée, mails envoyés au créateur et aux participants.');
    }
    


public function index(Request $request)
{
    $meetings = Meeting::withCount('participants')
        ->latest()
        ->get(['id', 'nom', 'lieu', 'start_time', 'end_time', 'status']); // <-- ajouter end_time + status

    return Inertia::render('Dashboard', [
        'meetings' => $meetings,
    ]);
}




    public function destroy(Meeting $meeting)
{
    $meeting->delete();
    return redirect()->back();
}
public function show($meetingId)
{
    $meeting = Meeting::find($meetingId);

    return Inertia::render('Welcome', [
        'meeting' => $meeting?->only(['id', 'nom', 'lieu', 'start_time', 'end_time', 'status']) ?? null,
    ]);
}







}
