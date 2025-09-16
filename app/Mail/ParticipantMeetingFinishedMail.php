<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Barryvdh\DomPDF\Facade\Pdf; // si tu utilises barryvdh/laravel-dompdf

class ParticipantMeetingFinishedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $meeting;
    public $participant;

    public function __construct($meeting, $participant)
    {
        $this->meeting = $meeting;
        $this->participant = $participant;
    }

    public function build()
    {
        return $this->subject('Votre participation à la réunion est terminée')
                    ->view('emails.participant_finished')
                    ->attachData(
                        Pdf::loadView('pdf.liste', [
                            'participants' => [$this->participant],
                            'meeting' => $this->meeting
                        ])->output(),
                        'liste_presence.pdf'
                    );
    }
}
