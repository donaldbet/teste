<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Curso>
 */
class CursoFactory extends Factory
{
    protected $model = Curso::class;

    public function definition()
    {
        return [
            'nome' => $this->faker->word(),
            'descricao' => $this->faker->sentence(),
        ];
    }
}
