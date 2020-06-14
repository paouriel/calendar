<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CalendarEvent extends Model
{
    protected $fillable = [
        'event_name',
        'start_date',
        'end_date',
        'occurring_days'
    ];
}
