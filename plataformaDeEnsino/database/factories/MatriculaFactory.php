<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Matricula>
 */
class MatriculaFactory extends Factory
{
    protected $model = Matricula::class;

    public function definition()
    {
        return [
            'aluno_id' => \App\Models\Aluno::factory(),
            'curso_id' => \App\Models\Curso::factory(),
            'disciplina_id' => \App\Models\Disciplina::factory(),
            'professor_id' => \App\Models\Professor::factory(),
        ];
    }
}
