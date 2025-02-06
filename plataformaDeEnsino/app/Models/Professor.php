<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professor extends Model
{
    use HasFactory;

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
