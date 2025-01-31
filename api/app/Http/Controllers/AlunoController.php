<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use App\Models\Curso;
use App\Models\Disciplina;
use App\Models\Matricula;
use Carbon\Carbon;
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
            'data' => $alunos->map(function ($aluno) {
                return [
                    'id' => $aluno->id,
                    'nome' => $aluno->nome,
                    'email' => $aluno->email,
                    'data_nascimento' => Carbon::parse($aluno->data_nascimento)->format('d/m/Y')
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
                'data' => [
                    'id' => $aluno->id,
                    'nome' => $aluno->nome,
                    'email' => $aluno->email,
                    'data_nascimento' => Carbon::parse($aluno->data_nascimento)->format('d/m/Y')
                ]
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

    public function disciplinas_cursos(Aluno $aluno)
    {
        try {
            $aluno = Aluno::findOrFail($aluno->id);
            $matriculas = Matricula::where('aluno_id', $aluno->id)->get();
            $disciplinas = Disciplina::whereIn('curso_id', $matriculas->pluck('curso_id'))->get();
            $cursos = Curso::whereIn('id', $matriculas->pluck('curso_id'))->get();
            if ($disciplinas->isEmpty()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Nenhuma disciplina encontrada'
                ], 404);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Disciplinas encontradas',
                'data' => [
                    'disciplinas' => $disciplinas->map(function ($disciplina) {
                        return [
                            'id' => $disciplina->id,
                            'titulo' => $disciplina->titulo,
                            'descricao' => $disciplina->descricao
                        ];
                    }),
                    'cursos' => $cursos->map(function ($curso) {
                        return [
                            'id' => $curso->id,
                            'titulo' => $curso->titulo,
                            'data_inicio' => Carbon::parse($curso->data_inicio)->format('d/m/Y'),
                            'data_fim' => Carbon::parse($curso->data_fim)->format('d/m/Y')
                        ];
                    })
                ]
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Aluno não encontrado'
            ], 404);
        }
    }
}
