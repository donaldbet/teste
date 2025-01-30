<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use Illuminate\Http\Request;

class CursoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $curso = Curso::all();
        if ($curso->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nenhum curso encontrado'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Cursos encontrados',
            'data' => $curso
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string',
            'descricao' => 'required|string',
            'data_inicio' => 'required|date',
            'data_fim' => 'required|date'
        ], [
            'titulo.required' => 'O campo título é obrigatório',
            'descricao.required' => 'O campo descrição é obrigatório',
            'data_inicio.required' => 'O campo data de início é obrigatório',
            'data_fim.required' => 'O campo data de fim é obrigatório'
        ]);
        $curso = Curso::withTrashed()->where('nome', $request->nome)->first();
        if ($curso) {
            if ($curso->trashed()) {
                $curso->restore();
                return response()->json([
                    'status' => 'success',
                    'message' => 'Curso restaurado com sucesso',
                    'data' => $curso
                ], 201);
            }
            return response()->json([
                'status' => 'error',
                'message' => 'Curso já cadastrado'
            ], 409);
        }
        $curso = Curso::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Curso cadastrado com sucesso',
            'data' => $curso
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Curso $curso)
    {
        try {
            return response()->json([
                'status' => 'success',
                'message' => 'Curso encontrado',
                'data' => $curso
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Curso não encontrado'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Curso $curso)
    {
        $request->validate([
            'nome' => 'string',
            'carga_horaria' => 'integer',
            'professor_id' => 'integer'
        ], [
            'carga_horaria.integer' => 'O campo carga horária deve ser um número inteiro',
            'professor_id.integer' => 'O campo professor deve ser um número inteiro'
        ]);
        try {
            $curso->update($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'Curso atualizado com sucesso',
                'data' => $curso
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao atualizar curso'
            ], 400);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Curso $curso)
    {
        try {
            $curso->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Curso deletado com sucesso'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao deletar curso'
            ], 400);
        }
    }

    public function infoCard(){
        $cursos = Curso::all();
        $totalCursos = $cursos->count();
        $cursoMaisAlunos = $cursos->sortByDesc('alunos_count')->first();
        $cursoMenosAlunos = $cursos->sortBy('alunos_count')->first();

        $cursoMaisAlunosNome = $cursoMaisAlunos ? $cursoMaisAlunos->nome : null;
        $cursoMenosAlunosNome = $cursoMenosAlunos ? $cursoMenosAlunos->nome : null;

        return response()->json([
            'status' => 'success',
            'message' => 'Informações do card',
            'data' => [
                'total_cursos' => $totalCursos,
                'curso_mais_alunos' => $cursoMaisAlunosNome,
                'curso_menos_alunos' => $cursoMenosAlunosNome
            ]
        ]);
    }
}
