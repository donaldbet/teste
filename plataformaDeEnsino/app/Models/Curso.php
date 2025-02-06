<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    use HasFactory;

    protected $table = 'cursos';

    protected $fillable = ['titulo', 'descricao', 'data_inicio', 'data_fim'];

    // Relacionamento com Matrículas
    public function matriculas()
    {
        return $this->hasMany(Matricula::class);
    }

    public function disciplinas()
    {
        return $this->hasMany(Disciplina::class);
    }
}
