<?php
/**
 * Created by PhpStorm.
 * User: Paolo
 * Date: 13/06/2020
 * Time: 6:45 AM
 */

namespace App\Repositories\Interfaces;


interface BaseRepositoryInterface
{
    public function all();
    public function find($id);
    public function create(array $data);
}
