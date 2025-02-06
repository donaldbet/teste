<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Professor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfessorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $professores = Professor::all();
        return view('professores.index', compact('professores'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('professores.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:professores',
            'senha' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $professor = new Professor();
        $professor->nome = $request->nome;
        $professor->email = $request->email;
        $professor->senha = Hash::make($request->senha);
        $professor->save();

        return redirect()->route('professores.index')->with('success', 'Professor criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $professor = Professor::findOrFail($id);
        return view('professores.show', compact('professor'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $professor = Professor::findOrFail($id);
        return view('professores.edit', compact('professor'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:professores,email,' . $id,
            'senha' => 'nullable|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $professor = Professor::findOrFail($id);
        $professor->nome = $request->nome;
        $professor->email = $request->email;
        if ($request->filled('senha')) {
            $professor->senha = Hash::make($request->senha);
        }
        $professor->save();

        return redirect()->route('professores.index')->with('success', 'Professor atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $professor = Professor::findOrFail($id);
        $professor->delete();

        return redirect()->route('professores.index')->with('success', 'Professor deletado com sucesso.');
    }

    /**
     * Show the login form.
     */
    public function showLoginForm()
    {
        return view('auth.professor');
    }

    /**
     * Handle the login request.
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'senha');

        if (Auth::guard('professor')->attempt(['email' => $credentials['email'], 'password' => $credentials['senha']])) {
            return redirect()->route('professores.index')->with('success', 'Login realizado com sucesso.');
        }

        return redirect()->back()->withErrors(['email' => 'Credenciais inválidas.'])->withInput();
    }
}
