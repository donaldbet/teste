<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Curso;
use App\Models\Disciplina;
use App\Models\Professor;

class CursoDisciplinaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $curso = Curso::create([
            'titulo' => 'Curso de Programação',
            'descricao' => 'Curso completo de programação',
            'data_inicio' => '2025-02-01',
            'data_fim' => '2025-12-31'
        ]);

        $professor = Professor::where('email', 'jubilut@exemplo.com')->first();

        $disciplinas = [
            ['titulo' => 'Introdução à Programação', 'descricao' => 'Disciplina introdutória', 'curso_id' => $curso->id, 'professor_id' => $professor->id],
            ['titulo' => 'Algoritmos e Estruturas de Dados', 'descricao' => 'Disciplina sobre algoritmos', 'curso_id' => $curso->id, 'professor_id' => $professor->id],
            ['titulo' => 'Desenvolvimento Web', 'descricao' => 'Disciplina sobre desenvolvimento web', 'curso_id' => $curso->id, 'professor_id' => $professor->id]
        ];

        foreach ($disciplinas as $disciplina) {
            Disciplina::create($disciplina);
        }
    }
}
