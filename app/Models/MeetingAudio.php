<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeetingAudio extends Model
{
    

    protected $fillable = ['meeting_id', 'file_path'];

    public function meeting()
    {
        return $this->belongsTo(Meeting::class);
    }
}
