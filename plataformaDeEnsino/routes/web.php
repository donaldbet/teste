<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AlunoController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\DisciplinaController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\MatriculaController;

// Rotas de Login
Route::get('login-aluno', [AlunoController::class, 'showLoginForm'])->name('login-aluno');
Route::post('login-aluno', [AlunoController::class, 'login']);

Route::get('login-professor', [ProfessorController::class, 'showLoginForm'])->name('login-professor');
Route::post('login-professor', [ProfessorController::class, 'login']);

// Rotas para Aluno
Route::middleware('auth:aluno')->group(function () {
    Route::get('/aluno/{id}/editar', [AlunoController::class, 'edit'])->name('aluno.edit');
    Route::put('/aluno/{id}', [AlunoController::class, 'update'])->name('aluno.update');
    Route::get('/aluno/{id}', [AlunoController::class, 'show'])->name('aluno.show');
});

// Rotas para Professor
Route::middleware('auth:professor')->group(function () {
    Route::get('/professor/{id}/editar', [ProfessorController::class, 'edit'])->name('professor.edit');
    Route::put('/professor/{id}', [ProfessorController::class, 'update'])->name('professor.update');
    Route::get('/professor/{id}', [ProfessorController::class, 'show'])->name('professor.show');

    // Rotas para Disciplina
    Route::resource('disciplina', DisciplinaController::class)->except(['index', 'show']);
    Route::get('/disciplina', [DisciplinaController::class, 'index'])->name('disciplina.index');
    Route::post('/disciplina', [DisciplinaController::class, 'store'])->name('disciplina.store');
    Route::get('/disciplina/{id}/editar', [DisciplinaController::class, 'edit'])->name('disciplina.edit');

    // Rotas para Curso
    Route::resource('curso', CursoController::class)->except(['index', 'show']);
    Route::get('/curso', [CursoController::class, 'index'])->name('curso.index');
    Route::post('/curso', [CursoController::class, 'store'])->name('curso.store');
    Route::get('/curso/{id}/editar', [CursoController::class, 'edit'])->name('curso.edit');

    // Rotas para Matrícula
    Route::resource('matricula', MatriculaController::class)->except(['index', 'show']);
    Route::get('/matricula', [MatriculaController::class, 'index'])->name('matricula.index');
    Route::post('/matricula', [MatriculaController::class, 'store'])->name('matricula.store');
    Route::delete('/matricula/{id}', [MatriculaController::class, 'destroy'])->name('matricula.destroy');

    Route::get('/aluno', [AlunoController::class, 'index'])->name('aluno.index');
    Route::post('/aluno', [AlunoController::class, 'store'])->name('aluno.store');
});

// Rotas Inertia.js
Route::get('/', function () {
    return Inertia::render('Home', [
        'title' => 'Homepage',
    ]);
})->name('homepage');

Route::get('/about', function () {
    return Inertia::render('About', [
        'title' => 'About',
    ]);
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact', [
        'title' => 'Contact',
    ]);
})->name('contact');
