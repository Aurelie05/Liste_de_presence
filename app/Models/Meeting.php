<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    protected $fillable = ['nom', 'lieu', 'start_time', 'end_time', 'user_id','status'];


    public function participants()
    {
        return $this->hasMany(Participant::class);
    }
    public function creator() {
        return $this->belongsTo(User::class, 'user_id'); // ou le champ que tu utilises
    }
    
}
