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
        return view('professor.show', compact('professor'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('professor.create');
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

        return redirect()->route('professor.show')->with('success', 'Professor criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $professor = Professor::findOrFail($id);
        $disciplinas = $professor->disciplinas()->paginate(5); // 5 resultados por página

        return view('professor.show', compact('professor', 'disciplinas'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $professor = Professor::findOrFail($id);
        return view('professor.edit', compact('professor'));
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

        return redirect()->route('professor.index')->with('success', 'Professor atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $professor = Professor::findOrFail($id);
        $professor->delete();

        return redirect()->route('professor.index')->with('success', 'Professor deletado com sucesso.');
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
     *
     * Vou deixar os logs para verem meu sofrimento, no seeder eu tinha colocado pra encryptar a senha que já seria encryptada automaticamente
     * Percebi isso horas depois...
     */
    public function login(Request $request)
    {
        try {
            $credentials = $request->only('email', 'senha');
            \Log::info('Tentativa de login com as credenciais:', $credentials);

            $professor = Professor::where('email', $credentials['email'])->first();

            if ($professor && Hash::check($credentials['senha'], $professor->senha)) {
                Auth::guard('professor')->login($professor);
                \Log::info('Login bem-sucedido para o professor:', ['id' => $professor->id, 'email' => $professor->email]);
                return redirect()->route('professor.show', $professor->id)->with('success', 'Login realizado com sucesso.');
            } else {
                if ($professor) {
                    \Log::info('Professor encontrado no banco de dados:', ['id' => $professor->id, 'email' => $professor->email]);
                    \Log::info('Senha no banco de dados:', ['senha' => $professor->senha]);
                    \Log::info('Senha fornecida:', ['senha' => $credentials['senha']]);
                } else {
                    \Log::info('Professor não encontrado no banco de dados com o email fornecido.');
                }
                \Log::warning('Credenciais inválidas para o login do professor.', $credentials);
                return redirect()->back()->withErrors(['email' => 'Credenciais inválidas.'])->withInput();
            }
        } catch (\Exception $e) {
            \Log::error('Erro ao fazer login: ' . $e->getMessage());
            return redirect()->back()->withErrors(['email' => 'Ocorreu um erro ao tentar fazer login.'])->withInput();
        }
    }



}
