<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AlunoController;
use App\Http\Controllers\ProfessorController;

Route::get('login-aluno', [AlunoController::class, 'showLoginForm'])->name('login-aluno');
Route::post('login-aluno', [AlunoController::class, 'login']);

Route::middleware(['auth'])->group(function () {
Route::resource('alunos', AlunoController::class);
});

Route::get('login-professor', [ProfessorController::class, 'showLoginForm'])->name('login-professor');
Route::post('login-professor', [ProfessorController::class, 'login']);

Route::middleware(['auth:professor'])->group(function () {
    Route::resource('professores', ProfessorController::class);
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
