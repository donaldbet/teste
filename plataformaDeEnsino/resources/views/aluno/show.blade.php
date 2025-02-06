@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Dados do Aluno</h1>
    <p><strong>Nome:</strong> {{ $aluno->nome }}</p>
    <p><strong>Email:</strong> {{ $aluno->email }}</p>
    <p><strong>Data de Nascimento:</strong> {{ $aluno->data_nascimento }}</p>
    <a href="{{ route('aluno.edit', $aluno->id) }}" class="btn btn-primary">Editar</a>
</div>
@endsection
