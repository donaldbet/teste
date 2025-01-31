<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use App\Models\Curso;
use App\Models\Disciplina;
use App\Models\Matricula;
use App\Models\Professor;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $aluno = (new Aluno)->infoDashboard();
        $curso = (new Curso())->infoDashboard();
        return response()->json([
            'message' => 'Dashboard',
            'data' => [
                'aluno' => $aluno,
                'curso' => $curso,
                'disciplina'=> [
                    'total' => Disciplina::count(),
                ],
                'matricula' => [
                    'total' => Matricula::count(),
                ],
                'professor' => [
                    'total' => Professor::count(),
                ]
            ]
        ], 200);
    }
}
