<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Aluno;

class AlunoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Aluno::create([
            'nome' => 'Emanuel',
            'email' => 'emanuel@exemplo.com',
            'senha' => 'senha123',
            'nascimento' => '2000-01-01'
        ]);
    }
}
