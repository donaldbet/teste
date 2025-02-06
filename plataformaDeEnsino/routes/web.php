<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AlunoController;
use App\Http\Controllers\ProfessorController;

Route::get('login-aluno', [AlunoController::class, 'showLoginForm'])->name('login-aluno');
Route::post('login-aluno', [AlunoController::class, 'login']);

Route::get('login-professor', [ProfessorController::class, 'showLoginForm'])->name('login-professor');
Route::post('login-professor', [ProfessorController::class, 'login']);

Route::middleware('auth:web')->group(function () {
    // Rotas para Aluno
    Route::get('/aluno/{id}/editar', [AlunoController::class, 'edit'])->name('aluno.edit');
    Route::put('/aluno/{id}', [AlunoController::class, 'update'])->name('aluno.update');
    Route::get('/aluno/{id}', [AlunoController::class, 'show'])->name('aluno.show');
});

Route::middleware('auth:professor')->group(function () {
    // Rotas para Professor
    Route::get('/professor/{id}/editar', [ProfessorController::class, 'edit'])->name('professor.edit');
    Route::put('/professor/{id}', [ProfessorController::class, 'update'])->name('professor.update');
    Route::get('/professor/{id}', [ProfessorController::class, 'show'])->name('professor.show');
});

Route::get(
    '/',
    function () {
        return Inertia::render(
            'Home',
            [
                'title' => 'Homepage',
            ]
        );
    }
)->name('homepage');

Route::get(
    '/about',
    function () {
        return Inertia::render(
            'About',
            [
                'title' => 'About',
            ]
        );
    }
)->name('about');

Route::get(
    '/contact',
    function () {
        return Inertia::render(
            'Contact',
            [
                'title' => 'Contact',
            ]
        );
    }
)->name('contact');
