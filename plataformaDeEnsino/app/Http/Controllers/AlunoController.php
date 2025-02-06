<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Aluno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AlunoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $alunos = Aluno::all();
        return view('alunos.index', compact('alunos'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('alunos.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:alunos',
            'senha' => 'required|string|min:8|confirmed',
            'data_nascimento' => 'required|date',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $aluno = new Aluno();
        $aluno->nome = $request->nome;
        $aluno->email = $request->email;
        $aluno->senha = Hash::make($request->senha);
        $aluno->data_nascimento = $request->data_nascimento;
        $aluno->save();

        return redirect()->route('alunos.index')->with('success', 'Aluno criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $aluno = Aluno::findOrFail($id);
        return view('alunos.show', compact('aluno'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $aluno = Aluno::findOrFail($id);
        return view('alunos.edit', compact('aluno'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:alunos,email,' . $id,
            'senha' => 'nullable|string|min:8|confirmed',
            'data_nascimento' => 'required|date',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $aluno = Aluno::findOrFail($id);
        $aluno->nome = $request->nome;
        $aluno->email = $request->email;
        if ($request->filled('senha')) {
            $aluno->senha = Hash::make($request->senha);
        }
        $aluno->data_nascimento = $request->data_nascimento;
        $aluno->save();

        return redirect()->route('alunos.index')->with('success', 'Aluno atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $aluno = Aluno::findOrFail($id);
        $aluno->delete();

        return redirect()->route('alunos.index')->with('success', 'Aluno deletado com sucesso.');
    }

    /**
     * Show the login form.
     */
    public function showLoginForm()
    {
        return view('auth.aluno');
    }

    /**
     * Handle the login request.
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'senha');

        if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['senha']])) {
            return redirect()->route('alunos.index')->with('success', 'Login realizado com sucesso.');
        }

        return redirect()->back()->withErrors(['email' => 'Credenciais inválidas.'])->withInput();
    }
}
