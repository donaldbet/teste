<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matricula extends Model
{
    use HasFactory;

    protected $table = 'matriculas';

    protected $fillable = ['aluno_id', 'curso_id', 'disciplina_id', 'professor_id'];

    // Relacionamento com Aluno
    public function aluno()
    {
        return $this->belongsTo(Aluno::class);
    }

    // Relacionamento com Curso
    public function curso()
    {
        return $this->belongsTo(Curso::class);
    }

    // Relacionamento com Disciplina
    public function disciplina()
    {
        return $this->belongsTo(Disciplina::class);
    }

    // Relacionamento com Professor
    public function professor()
    {
        return $this->belongsTo(Professor::class);
    }
}
