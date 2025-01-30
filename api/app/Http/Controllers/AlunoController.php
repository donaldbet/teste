<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use Illuminate\Http\Request;

class AlunoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $alunos = Aluno::all();
        if ($alunos->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nenhum aluno encontrado'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Alunos encontrados',
            'data' => $alunos
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string',
            'email' => 'required|email',
            'data_nascimento' => 'date'
        ], [
            'nome.required' => 'O campo nome é obrigatório',
            'email.required' => 'O campo email é obrigatório',
            'email.email' => 'O campo email deve ser um email válido',
            'data_nascimento.date' => 'A data de nascimento deve ser uma data válida'
        ]);
        $aluno = Aluno::withTrashed()->where('email', $request->email)->first();
        if ($aluno) {
            if ($aluno->trashed()) {
                $aluno->restore();
                return response()->json([
                    'status' => 'success',
                    'message' => 'Aluno restaurado com sucesso',
                    'data' => $aluno
                ], 201);
            }
            return response()->json([
                'status' => 'error',
                'message' => 'Aluno já cadastrado'
            ], 409);
        }
        $aluno = Aluno::create($request->all());
        $user = new \App\Models\User();
        $user->name = $request->nome;
        $user->email = $request->email;
        $user->password = bcrypt('123456');
        $user->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Aluno criado com sucesso',
            'data' => $aluno
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Aluno $aluno)
    {
        try {
            $aluno = Aluno::findOrFail($aluno->id);
            return response()->json([
                'status' => 'success',
                'message' => 'Aluno encontrado',
                'data' => $aluno
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Aluno não encontrado'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Aluno $aluno)
    {
        $request->validate([
            'nome' => 'string',
            'email' => 'email',
            'data_nascimento' => 'date'
        ], [
            'email.email' => 'O campo email deve ser um email válido',
            'data_nascimento.date' => 'A data de nascimento deve ser uma data válida'
        ]);
        try {
            $aluno->update($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'Aluno atualizado com sucesso',
                'data' => $aluno
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Aluno não encontrado'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Aluno $aluno)
    {
        try {
            $aluno = Aluno::findOrFail($aluno->id);
            $aluno->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Aluno deletado com sucesso'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Aluno não encontrado'
            ], 404);
        }
    }

    public function infoCard()
    {
        try {
            $alunos = Aluno::all();
            $alunosCount = $alunos->count();
            $alunosMaiorIdade = $alunos->filter(function ($aluno) {
                return $aluno->data_nascimento->diffInYears() >= 18;
            })->count();
            $alunosMenorIdade = $alunos->filter(function ($aluno) {
                return $aluno->data_nascimento->diffInYears() < 18;
            })->count();
            return response()->json([
                'status' => 'success',
                'message' => 'Informações do card',
                'data' => [
                    'total' => $alunosCount,
                    'maior_idade' => $alunosMaiorIdade,
                    'menor_idade' => $alunosMenorIdade
                ]
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao buscar informações do card'
            ], 400);
        }
    }
}
