<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    protected $fillable = ['meeting_id', 'nom', 'prenom', 'fonction','structure', 'email', 'signature'];


    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }
}
