<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\CalendarEvent;
use Faker\Generator as Faker;

$factory->define(CalendarEvent::class, function (Faker $faker) {
    $event_name = $faker->streetName;
    $end_date = $faker->dateTimeBetween('-10 days')->format('Y-m-d');
    $start_date = $faker->dateTimeBetween('-20 days', '-11 days')->format('Y-m-d');
    $days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    $occurring_days = $faker->randomElements($days, $faker->numberBetween(1, count($days)));

    return [
        'event_name' => $event_name,
        'start_date' => $start_date,
        'end_date' => $end_date,
        'occurring_days' => json_encode($occurring_days)
    ];
});
