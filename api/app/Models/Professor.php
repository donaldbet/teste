<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Professor extends Model
{
    use SoftDeletes;
    protected $fillable = ['nome', 'email'];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
    protected $table = 'professors';
}
