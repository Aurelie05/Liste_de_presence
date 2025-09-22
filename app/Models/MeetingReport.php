<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MeetingReport extends Model
{
    protected $fillable = ['meeting_id', 'report'];

    public function meeting() {
        return $this->belongsTo(Meeting::class);
}

}
