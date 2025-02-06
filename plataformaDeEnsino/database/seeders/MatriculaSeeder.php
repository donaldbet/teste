<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Matricula;
use App\Models\Aluno;
use App\Models\Curso;
use App\Models\Disciplina;
use App\Models\Professor;

class MatriculaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $aluno = Aluno::where('email', 'emanuel@exemplo.com')->first();
        $curso = Curso::where('titulo', 'Curso de Programação')->first();
        $professor = Professor::where('email', 'jubilut@exemplo.com')->first();
        $disciplinas = Disciplina::where('curso_id', $curso->id)->get();

        foreach ($disciplinas as $disciplina) {
            Matricula::create([
                'aluno_id' => $aluno->id,
                'curso_id' => $curso->id,
                'disciplina_id' => $disciplina->id,
                'professor_id' => $professor->id
            ]);
        }
    }
}
