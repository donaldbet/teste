<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Editar Matrícula</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
</head>
<body class="bg-gray-100 h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center">Editar Matrícula</h1>
        <form action="{{ route('matricula.update', $matricula->id) }}" method="POST">
            @csrf
            @method('PUT')
            <div class="form-group mb-4">
                <label for="aluno_id" class="block text-gray-700 font-semibold mb-2">Aluno:</label>
                <select id="aluno_id" name="aluno_id" class="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    @foreach($alunos as $aluno)
                        <option value="{{ $aluno->id }}" {{ $aluno->id == $matricula->aluno_id ? 'selected' : '' }}>{{ $aluno->nome }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group mb-4">
                <label for="curso_id" class="block text-gray-700 font-semibold mb-2">Curso:</label>
                <select id="curso_id" name="curso_id" class="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    @foreach($cursos as $curso)
                        <option value="{{ $curso->id }}" {{ $curso->id == $matricula->curso_id ? 'selected' : '' }}>{{ $curso->titulo }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group mb-4">
                <label for="disciplina_id" class="block text-gray-700 font-semibold mb-2">Disciplina:</label>
                <select id="disciplina_id" name="disciplina_id" class="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    @foreach($disciplinas as $disciplina)
                        <option value="{{ $disciplina->id }}" {{ $disciplina->id == $matricula->disciplina_id ? 'selected' : '' }}>{{ $disciplina->titulo }}</option>
                    @endforeach
                </select>
            </div>
            <div class="form-group mb-6">
                <label for="professor_id" class="block text-gray-700 font-semibold mb-2">Professor:</label>
                <select id="professor_id" name="professor_id" class="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    @foreach($professores as $professor)
                        <option value="{{ $professor->id }}" {{ $professor->id == $matricula->professor_id ? 'selected' : '' }}>{{ $professor->nome }}</option>
                    @endforeach
                </select>
            </div>
            <button type="submit" class="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Salvar</button>
        </form>
    </div>
</body>
</html>
