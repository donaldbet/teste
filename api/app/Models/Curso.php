<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Curso extends Model
{
    use SoftDeletes;
    protected $fillable = ['titulo', 'descricao', 'data_inicio', 'data_fim'];
    protected $dates = ['data_inicio', 'data_fim'];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
    protected $casts = [
        'data_inicio' => 'date',
        'data_fim' => 'date'
    ];
    public function cursoMenosAlunos()
    {   
        $result = DB::select('SELECT c.id, c.titulo, COUNT(*) as count FROM matriculas m INNER JOIN cursos c ON c.id = m.curso_id GROUP BY curso_id ORDER BY count ASC LIMIT 1');
        return $result[0]->titulo ?? null;
    }

    public function cursoMaisAlunos()
    {
        $result = DB::select('SELECT c.id, c.titulo, COUNT(*) as count FROM matriculas m INNER JOIN cursos c ON c.id = m.curso_id GROUP BY curso_id ORDER BY count DESC LIMIT 1');
        return $result[0]->titulo ?? null;
    }

    public function infoDashboard()
    {
        return [
            'curso_menos_alunos' => $this->cursoMenosAlunos(),
            'curso_mais_alunos' => $this->cursoMaisAlunos(),
            'total_cursos' => Curso::count()
        ];
    }
}
