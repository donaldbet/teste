<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Curso;
use App\Models\Disciplina;
use App\Models\Professor;
use Illuminate\Http\Request;

class DisciplinaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $disciplinas = Disciplina::where('titulo', 'like', '%' . $search . '%')->paginate(10); // Paginação de 10 disciplinas por página
        $cursos = Curso::all();
        $professores = Professor::all();
        return view('disciplina.index', compact('disciplinas', 'cursos', 'professores'));
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'curso_id' => 'required|exists:cursos,id',
            'professor_id' => 'required|exists:professores,id',
        ]);

        Disciplina::create($request->all());

        return redirect()->route('disciplina.index')->with('success', 'Disciplina cadastrada com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $disciplina = Disciplina::findOrFail($id);
        $cursos = Curso::all();
        $professores = Professor::all();
        return view('disciplina.edit', compact('disciplina', 'cursos', 'professores'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'required|string',
            'curso_id' => 'required|integer|exists:cursos,id',
            'professor_id' => 'required|integer|exists:professores,id',
        ]);

        $disciplina = Disciplina::findOrFail($id);

        $disciplina->update($request->all());

        return redirect()->route('disciplina.index', $disciplina->id)->with('success', 'Disciplina atualizada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
