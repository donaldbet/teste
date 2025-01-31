<?php

namespace App\Http\Controllers;

use App\Models\Professor;
use Illuminate\Http\Request;

class ProfessorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $professores = Professor::all();
        if ($professores->isEmpty()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Nenhum professor encontrado'
            ], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Professores encontrados',
            'data' => $professores
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
        ], [
            'nome.required' => 'O campo nome é obrigatório',
            'email.required' => 'O campo email é obrigatório',
            'email.email' => 'O campo email deve ser um email válido',
        ]);
        $professor = Professor::withTrashed()->where('email', $request->email)->first();
        if ($professor) {
            if ($professor->trashed()) {
                $professor->restore();
                return response()->json([
                    'status' => 'success',
                    'message' => 'Professor restaurado com sucesso',
                    'data' => $professor
                ], 201);
            }
            return response()->json([
                'status' => 'error',
                'message' => 'Professor já cadastrado'
            ], 409);
        }
        $professor = Professor::create($request->all());
        return response()->json([
            'status' => 'success',
            'message' => 'Professor cadastrado com sucesso',
            'data' => $professor
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        try {
            $professor = Professor::findOrFail($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Professor encontrado',
                'data' => $professor
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Professor não encontrado'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            'nome' => 'string',
            'email' => 'email',
        ], [
            'email.email' => 'O campo email deve ser um email válido',
        ]);
        try {
            $professor = Professor::findOrFail($id);
            $professor->update($request->all());
            return response()->json([
                'status' => 'success',
                'message' => 'professor atualizado com sucesso',
                'data' => $professor
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'professor não encontrado'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $professor = Professor::findOrFail($id);
            $professor->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Professor deletado com sucesso'
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'error',
                'message' => 'Não foi possível deletar o professor'
            ], 404);
        }
    }
}
