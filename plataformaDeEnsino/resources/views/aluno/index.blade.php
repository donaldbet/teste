<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lista de Alunos</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">
    <div class="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">Lista de Alunos</h1>
        <form method="GET" action="{{ route('aluno.index') }}" class="mb-4">
            <input type="text" name="search" placeholder="Buscar por nome" class="border rounded-md px-4 py-2" value="{{ request('search') }}" />
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Buscar</button>
        </form>
        <ul class="list-disc list-inside mb-8">
            @foreach($alunos as $aluno)
            <li class="mb-2">
                {{ $aluno->nome }} - {{ $aluno->email }}
                <a href="{{ route('aluno.edit', $aluno->id) }}" class="text-blue-500 hover:underline ml-2">Editar</a>
            </li>
            @endforeach
        </ul>
        {{ $alunos->links() }}
        <h2 class="text-xl font-bold mb-4">Cadastrar Novo Aluno</h2>
        <form action="{{ route('aluno.store') }}" method="POST" class="space-y-4">
            @csrf
            <div class="form-group">
                <label for="nome" class="block text-sm font-medium text-gray-700">Nome:</label>
                <input type="text" id="nome" name="nome" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div class="form-group">
                <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
                <input type="email" id="email" name="email" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div class="form-group">
                <label for="senha" class="block text-sm font-medium text-gray-700">Senha:</label>
                <input type="text" id="senha" name="senha" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <div class="form-group">
                <label for="nascimento" class="block text-sm font-medium text-gray-700">Data nascimento:</label>
                <input type="date" id="nascimento" name="nascimento" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-md">Cadastrar</button>
        </form>
    </div>
</body>
</html>
