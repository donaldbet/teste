<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dados do Professor</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 class="text-2xl font-bold mb-4">Dados do Professor</h1>
        <p class="mb-2"><strong>Nome:</strong> {{ $professor->nome }}</p>
        <p class="mb-4"><strong>Email:</strong> {{ $professor->email }}</p>
        <a href="{{ route('professor.edit', $professor->id) }}" class="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Editar</a>


        <div class="space-y-2  mt-4 p-8 rounded-lg ">
            <a href="{{ route('aluno.index') }}" class="block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Lista de Alunos</a>
            <a href="{{ route('disciplina.index') }}" class="block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Lista de Disciplinas</a>
            <a href="{{ route('curso.index') }}" class="block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Lista de Cursos</a>
            <a href="{{ route('matricula.index') }}" class="block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">Lista de Matrículas</a>
        </div>
    </div>
</body>
</html>
