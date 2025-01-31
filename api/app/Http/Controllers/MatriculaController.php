<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use App\Models\Matricula;
use App\Models\Curso;
use Illuminate\Http\Request;

class MatriculaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $matriculas = Matricula::all();
        if ($matriculas->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nenhuma matrícula encontrada'
            ], 404);
        }
        foreach ($matriculas as $matricula) {
            $matricula->aluno = Aluno::find($matricula->aluno_id);
            $matricula->curso = Curso::find($matricula->curso_id);
            $matricula->makeHidden(['aluno_id', 'curso_id']);
            $matricula->aluno->makeHidden(['email', 'data_nascimento']);
            $matricula->curso->makeHidden(['data_inicio', 'data_fim']);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Matrículas encontradas',
            'data' => $matriculas->map(function ($matricula) {
                return [
                    'id' => $matricula->id,
                    'aluno' => $matricula->aluno,
                    'curso' => $matricula->curso,
                    'dataHora' => $matricula->created_at->format('d/m/Y H:i:s')
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
            'aluno_id' => 'required|integer',
            'curso_id' => 'required|integer'
        ], [
            'aluno_id.required' => 'Deve selecionar o aluno',
            'curso_id.required' => 'Deve selecionar o curso',
        ]);
        $matricula = Matricula::withTrashed()->where('aluno_id', $request->aluno_id)->where('curso_id', $request->curso_id)->first();
        if($matricula) {
            if ($matricula->trashed()) {
                $matricula->restore();
                return response()->json([
                    'status' => 'success',
                    'message' => 'Matrícula restaurada com sucesso',
                    'data' => $matricula
                ], 201);
            }
            return response()->json([
                'status' => 'error',
                'message' => 'Matrícula já realizada'
            ], 409);
        }
        $matricula = Matricula::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Matrícula realizada com sucesso',
            'data' => $matricula
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Matricula $matricula)
    {
        try {
            $matricula = Matricula::findOrFail($matricula->id);
            return response()->json([
                'status' => 'success',
                'message' => 'Matrícula encontrada',
                'data' => $matricula
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Matrícula não encontrada'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Matricula $matricula)
    {
        $request->validate([
            'aluno_id' => 'required|integer',
            'curso_id' => 'required|integer'
        ], [
            'aluno_id.required' => 'Deve selecionar o aluno',
            'curso_id.required' => 'Deve selecionar o curso',
        ]);
        try {
            $matricula = Matricula::findOrFail($matricula->id);
            $matricula->update($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'Matrícula atualizada com sucesso',
                'data' => $matricula
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Matrícula não encontrada'
            ], 404);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Matricula $matricula)
    {
        try {
            $matricula = Matricula::findOrFail($matricula->id);
            $matricula->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Matrícula deletada com sucesso'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Matrícula não encontrada'
            ], 404);
        }
    }
}
