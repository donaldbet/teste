<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Editar Disciplina</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Editar Disciplina</h1>
        <form action="{{ route('disciplina.update', $disciplina->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="form-group mb-4">
                <label for="titulo" class="block text-gray-700 font-semibold mb-2">Título:</label>
                <input type="text" id="titulo" name="titulo" class="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value="{{ $disciplina->titulo }}" />
            </div>
            <div class="form-group mb-4">
                <label for="descricao" class="block text-gray-700 font-semibold mb-2">Descrição:</label>
                <input type="text" id="descricao" name="descricao" class="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value="{{ $disciplina->descricao }}" />
            </div>
            <div class="form-group mb-4">
                <label for="curso_id" class="block text-sm font-medium text-gray-700">Curso:</label>
                <select id="curso_id" name="curso_id" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                    @foreach($cursos as $curso)
                        <option value="{{ $curso->id }}">{{ $curso->titulo }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group mb-4">
                <label for="professor_id" class="block text-sm font-medium text-gray-700">Professor:</label>
                <select id="professor_id" name="professor_id" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                    @foreach($professores as $professor)
                        <option value="{{ $professor->id }}">{{ $professor->nome }}</option>
                    @endforeach
                </select>
            </div>
            <button type="submit" class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Salvar</button>
        </form>
    </div>
</body>
</html>
