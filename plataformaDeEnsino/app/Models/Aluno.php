<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Auth\Authenticatable;

class Aluno extends Model implements AuthenticatableContract
{
    use HasFactory, Authenticatable;

    protected $table = 'alunos';

    protected $fillable = ['nome', 'email', 'senha', 'nascimento'];

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

}
