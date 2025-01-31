<?php

use App\Http\Controllers\AlunoController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\DisciplinaController;
use App\Http\Controllers\MatriculaController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

Route::get('/up', function () {
    return response()->json(['status' => 'ok']);
});

Route::prefix('/v1')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/aluno/change_password', [AuthController::class, 'changePassword']);
        Route::put('/aluno/{aluno}', [AlunoController::class, 'update']);
        Route::get('/aluno/{aluno}', [AlunoController::class, 'show']);
        Route::get('/aluno/{aluno}/disciplinas_cursos', [AlunoController::class, 'disciplinas_cursos']);
        Route::get('/cursos/{curso}/disciplinas', [CursoController::class, 'disciplinas'])->middleware(IsAdmin::class);
        Route::apiResource('/alunos', AlunoController::class)->middleware(IsAdmin::class);
        Route::apiResource('/professores', ProfessorController::class)->middleware(IsAdmin::class);
        Route::apiResource('/cursos', CursoController::class)->middleware(IsAdmin::class);
        Route::apiResource('/matriculas', MatriculaController::class)->middleware(IsAdmin::class);
        Route::apiResource('/disciplinas', DisciplinaController::class)->middleware(IsAdmin::class);
        Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(IsAdmin::class);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/verify', [AuthController::class, 'verify']);
    });
    Route::post('/login', [AuthController::class, 'login']);
});
