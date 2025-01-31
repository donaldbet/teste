<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Disciplina;
use Carbon\Carbon;
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
            'data' => $curso->map(function ($curso) {
                return [
                    'id' => $curso->id,
                    'titulo' => $curso->titulo,
                    'descricao' => $curso->descricao,
                    'data_inicio' => Carbon::parse($curso->data_inicio)->format('d/m/Y'),
                    'data_fim' => Carbon::parse($curso->data_fim)->format('d/m/Y'),
                ];
            })
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'string',
            'descricao' => 'string',
            'data_inicio' => 'date',
            'data_fim' => 'date',
        ], [
            'data_inicio.date' => 'Data início deve ser uma data válida',
            'data_fim.date' => 'Data final deve ser uma data válida'
        ]);
        $curso = Curso::withTrashed()->where('titulo', $request->titulo)->first();
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
                'data' => [
                    'id' => $curso->id,
                    'titulo' => $curso->titulo,
                    'descricao' => $curso->descricao,
                    'data_inicio' => Carbon::parse($curso->data_inicio)->format('d/m/Y'),
                    'data_fim' => Carbon::parse($curso->data_fim)->format('d/m/Y'),
                ]
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
            'titulo' => 'string',
            'descricao' => 'string',
            'data_inicio' => 'date',
            'data_fim' => 'date',
        ], [
            'data_inicio.date' => 'Data início deve ser uma data válida',
            'data_fim.date' => 'Data final deve ser uma data válida'
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

    public function disciplinas(Curso $curso)
    {
        $disciplinas = Disciplina::where('curso_id', $curso->id)->get();
        if ($disciplinas->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nenhuma disciplina encontrada'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Disciplinas encontradas',
            'data' => $disciplinas
        ]);
    }
}
