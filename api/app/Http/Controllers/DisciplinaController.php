<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Disciplina;
use App\Models\Professor;
use Illuminate\Http\Request;

class DisciplinaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $disciplinas = Disciplina::all();
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string',
            'descricao' => 'string',
            'professor_id' => 'required|integer',
            'curso_id' => 'required|integer'
        ], [
            'titulo.required' => 'O campo título é obrigatório',
            'professor.required' => 'O campo professor é obrigatório',
            'curso_id.required' => 'O campo curso é obrigatório'
        ]);
        $disciplina = Disciplina::withTrashed()->where('titulo', $request->titulo)->first();
        if ($disciplina) {
            if ($disciplina->trashed()) {
                $disciplina->restore();
                return response()->json([
                    'status' => 'success',
                    'message' => 'Disciplina restaurada com sucesso',
                    'data' => $disciplina
                ], 201);
            }
            return response()->json([
                'status' => 'error',
                'message' => 'Disciplina já cadastrada'
            ], 409);
        }
        $disciplina = Disciplina::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Disciplina cadastrada com sucesso',
            'data' => $disciplina
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Disciplina $disciplina)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Disciplina $disciplina)
    {
        $request->validate([
            'titulo' => 'string',
            'descricao' => 'string'
        ], [
            'titulo.string' => 'O campo título deve ser uma string',
            'descricao.string' => 'O campo descrição deve ser uma string'
        ]);
        try {
            $disciplina->update($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'Disciplina atualizada com sucesso',
                'data' => $disciplina
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao atualizar disciplina'
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Disciplina $disciplina)
    {
        try {
            $disciplina->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Disciplina deletada com sucesso'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao deletar disciplina'
            ], 400);
        } 
    }
}
