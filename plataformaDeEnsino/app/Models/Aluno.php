<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aluno extends Model
{
    use HasFactory;

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
