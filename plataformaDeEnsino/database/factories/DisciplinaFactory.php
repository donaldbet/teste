<?php

namespace Database\Factories;

use App\Models\Curso;
use App\Models\Professor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Disciplina>
 */
class DisciplinaFactory extends Factory
{

    protected $model = Disciplina::class;

    public function definition(): array
    {
        return [
            'nome' => $this->faker->name,
            'descricao' => $this->faker->paragraph(),
            'professor_id' => Professor::factory(),
            'curso_id' => Curso::factory(),
        ];
    }
}
