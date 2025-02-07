<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lista de Matrículas</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">
    <div class="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">Lista de Matrículas</h1>
        <form method="GET" action="{{ route('matricula.index') }}" class="mb-4">
            <input type="text" name="search" placeholder="Buscar por nome" class="border rounded-md px-4 py-2" value="{{ request('search') }}" />
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md">Buscar</button>
        </form>
        <ul class="list-disc list-inside mb-8">
            @foreach($matriculas as $matricula)
            <li class="mb-2">
                {{ $matricula->aluno->nome }} - {{ $matricula->curso->titulo }} - {{ $matricula->disciplina->titulo }}
                <a href="{{ route('matricula.edit', $matricula->id) }}" class="text-blue-500 hover:underline ml-2">Editar</a>
                <form action="{{ route('matricula.destroy', $matricula->id) }}" method="POST" class="inline-block" onsubmit="return confirm('Tem certeza que deseja deletar esta matrícula?');">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="text-red-500 hover:underline ml-2">Excluir</button>
                </form>

            </li>
            @endforeach
        </ul>
        {{ $matriculas->links() }} <!-- Links de paginação -->

        <h2 class="text-xl font-bold mb-4">Matricular Aluno</h2>
        <form action="{{ route('matricula.store') }}" method="POST" class="space-y-4">
            @csrf
            <div class="form-group">
                <label for="aluno_id" class="block text-sm font-medium text-gray-700">Aluno:</label>
                <select id="aluno_id" name="aluno_id" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                    @foreach($alunos as $aluno)
                    <option value="{{ $aluno->id }}">{{ $aluno->nome }}</option>
                    @endforeach
                </select>
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
                <label for="disciplina_id" class="block text-sm font-medium text-gray-700">Disciplina:</label>
                <select id="disciplina_id" name="disciplina_id" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                    @foreach($disciplinas as $disciplina)
                    <option value="{{ $disciplina->id }}">{{ $disciplina->titulo }}</option>
                    @endforeach
                </select>
            </div>
            <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-md">Matricular</button>
        </form>
    </div>
</body>
</html>
