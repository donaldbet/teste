<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Curso extends Model
{
    use SoftDeletes;
    protected $fillable = ['titulo', 'descricao', 'data_inicio', 'data_fim'];
    protected $dates = ['data_inicio', 'data_fim'];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
}
