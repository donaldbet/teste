<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Disciplinas</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">
    <div class="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">Lista de Disciplinas</h1>
        <form method="GET" action="{{ route('disciplina.index') }}" class="mb-4">
            <input type="text" name="search" placeholder="Buscar por nome" class="border rounded-md px-4 py-2" value="{{ request('search') }}">
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Buscar</button>
        </form>
        <ul class="list-disc list-inside mb-8">
            @foreach($disciplinas as $disciplina)
                <li class="mb-2">
                    {{ $disciplina->titulo }} - {{ $disciplina->descricao }}
                    <a href="{{ route('disciplina.edit', $disciplina->id) }}" class="text-blue-500 hover:underline ml-2">Editar</a>
                </li>
            @endforeach
        </ul>
        {{ $disciplinas->links() }} <!-- Links de paginação -->

        <h2 class="text-xl font-bold mb-4">Cadastrar Nova Disciplina</h2>
        <form action="{{ route('disciplina.store') }}" method="POST" class="space-y-4">
            @csrf
            <div class="form-group">
                <label for="titulo" class="block text-sm font-medium text-gray-700">Título:</label>
                <input type="text" id="titulo" name="titulo" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
            </div>
            <div class="form-group">
                <label for="descricao" class="block text-sm font-medium text-gray-700">Descrição:</label>
                <textarea id="descricao" name="descricao" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"></textarea>
            </div>
            <div class="form-group">
                <label for="curso_id" class="block text-sm font-medium text-gray-700">Curso:</label>
                <select id="curso_id" name="curso_id" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                    @foreach($cursos as $curso)
                        <option value="{{ $curso->id }}">{{ $curso->titulo }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group">
                <label for="professor_id" class="block text-sm font-medium text-gray-700">Professor:</label>
                <select id="professor_id" name="professor_id" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                    @foreach($professores as $professor)
                        <option value="{{ $professor->id }}">{{ $professor->nome }}</option>
                    @endforeach
                </select>
            </div>
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-md">Cadastrar</button>
        </form>
    </div>
</body>
</html>
