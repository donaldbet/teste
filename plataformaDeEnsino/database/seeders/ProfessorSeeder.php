<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Professor;

class ProfessorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Professor::create([
            'nome' => 'Prof. Jubilut',
            'email' => 'jubilut@exemplo.com',
            'senha' => 'senha123'
        ]);
    }
}
