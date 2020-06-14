<?php

namespace App\Repositories;

use App\Models\CalendarEvent;
use App\Repositories\Interfaces\CalendarEventRepositoryInterface;

class CalendarEventRepository extends BaseRepository implements CalendarEventRepositoryInterface
{
    /**
     * CalendarEventRepository constructor.
     * @param CalendarEvent $model
     */
    public function __construct(CalendarEvent $model)
    {
        parent::__construct($model);
    }
}
