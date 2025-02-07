<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Professor</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">
    <div class="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">Editar Professor</h1>
        <form action="{{ route('professor.update', $professor->id) }}" method="POST" class="space-y-4">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="nome" class="block text-sm font-medium text-gray-700">Nome:</label>
                <input type="text" id="nome" name="nome" value="{{ old('nome', $professor->nome) }}" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
            </div>
            <div class="form-group">
                <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
                <input type="email" id="email" name="email" value="{{ old('email', $professor->email) }}" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
            </div>
            <div class="form-group">
                <label for="senha" class="block text-sm font-medium text-gray-700">Senha:</label>
                <input type="password" id="senha" name="senha" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
            </div>
            <button type="submit" class="btn btn-success bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Salvar</button>
        </form>
    </div>
</body>
</html>
