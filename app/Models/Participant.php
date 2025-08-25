<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Participant extends Model
{
    use HasFactory;

    protected $fillable = [
        'meeting_id',
        'nom',
        'prenom',
        'fonction',
        'telephone',
        'email',
        'signature',
    ];

    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }
}
