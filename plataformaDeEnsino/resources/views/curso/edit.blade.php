<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Editar Curso</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Editar Curso</h1>
        <form action="{{ route('curso.update', $curso->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="form-group mb-4">
                <label for="titulo" class="block text-gray-700 font-semibold mb-2">Titulo:</label>
                <input type="text" id="titulo" name="titulo" class="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value="{{ $curso->titulo }}" />
            </div>
            <div class="form-group mb-6">
                <label for="descricao" class="block text-gray-700 font-semibold mb-2">Descrição:</label>
                <input type="text" id="descricao" name="descricao" class="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value="{{ $curso->descricao }}" />
            </div>
            <button type="submit" class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Salvar</button>
        </form>
    </div>
</body>
</html>
