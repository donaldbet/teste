<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Disciplina extends Model
{
    use SoftDeletes;
    protected $fillable = ['titulo', 'descricao', 'curso_id', 'professor_id'];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
}
