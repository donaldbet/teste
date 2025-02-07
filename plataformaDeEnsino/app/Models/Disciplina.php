<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disciplina extends Model
{
    use HasFactory;

    protected $table = 'disciplinas';

    protected $fillable = ['titulo', 'descricao', 'curso_id', 'professor_id'];

    // Relacionamento com Matrículas
    public function matriculas()
    {
        return $this->hasMany(Matricula::class);
    }
    public function professor()
    {
        return $this->belongsTo(Professor::class);
    }
    public function curso()
    {
        return $this->belongsTo(Curso::class);
    }
}
