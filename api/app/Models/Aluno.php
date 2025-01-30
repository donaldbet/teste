<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Aluno extends Model
{
    use SoftDeletes;
    protected $fillable = ['nome', 'email', 'data_nascimento'];
    protected $dates = ['data_nascimento'];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
}
