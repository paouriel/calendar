<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCalendarEventRequest;
use App\Models\CalendarEvent;
use App\Repositories\CalendarEventRepository;
use App\Repositories\Interfaces\CalendarEventRepositoryInterface;

class CalendarEventController extends Controller
{

    /**
     * @var CalendarEventRepository $calendarEventRepository
     */
    private $calendarEventRepository;

    public function __construct(CalendarEventRepositoryInterface $calendarEventRepository)
    {
        $this->calendarEventRepository = $calendarEventRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (request()->wantsJson()) {
            return response()->json([
                'data' => $this->calendarEventRepository->all(),
                'success' => true,
                'message' => 'Successfully fetched calendar events',
            ]);
        }

        return view('app');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CreateCalendarEventRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCalendarEventRequest $request)
    {
        $calendarEvent = $this->calendarEventRepository->create($request->toArray());
        return response()->json([
            'data' => $calendarEvent,
            'success' => true,
            'message' => 'Calendar event successfully added'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param $id
     * @return CalendarEvent
     */
    public function show($id)
    {
        return $this->calendarEventRepository->find($id);
    }
}
