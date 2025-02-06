<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Auth\Authenticatable;

class Professor extends Model implements AuthenticatableContract
{
    use HasFactory, Authenticatable;

    protected $table = 'professores';

    protected $fillable = ['nome', 'email', 'senha'];

    protected $hidden = ['senha'];


    // Relacionamento com Matrículas
    public function matriculas()
    {
        return $this->hasMany(Matricula::class);
    }

    public function setSenhaAttribute($value)
    {
        $this->attributes['senha'] = bcrypt($value);
    }

    public function disciplinas()
    {
        return $this->hasMany(Disciplina::class);
    }
}
