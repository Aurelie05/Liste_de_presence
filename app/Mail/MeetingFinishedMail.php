<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MeetingFinishedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $meeting;
    public $pdf;

    public function __construct($pdf, $meeting)
    {
        $this->pdf = $pdf;
        $this->meeting = $meeting;
    }

    public function build()
    {
        return $this->subject('Compte-rendu de la réunion : '.$this->meeting->nom)
            ->view('emails.meeting_finished') // ton message HTML
            ->attachData($this->pdf->output(), 'liste_participants.pdf', [
                'mime' => 'application/pdf',
            ]);
    }
}
