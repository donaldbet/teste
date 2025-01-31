<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Matricula extends Model
{
    use SoftDeletes;
    protected $fillable = ['aluno_id', 'curso_id'];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
}
