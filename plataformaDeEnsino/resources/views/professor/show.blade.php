@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Dados do Professor</h1>
    <p><strong>Nome:</strong> {{ $professor->nome }}</p>
    <p><strong>Email:</strong> {{ $professor->email }}</p>
    <a href="{{ route('professor.edit', $professor->id) }}" class="btn btn-primary">Editar</a>
</div>
@endsection
