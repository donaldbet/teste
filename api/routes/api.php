<?php

use App\Http\Controllers\AlunoController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\DisciplinaController;
use App\Http\Controllers\MatriculaController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\AuthController;

Route::get('/up', function () {
    return response()->json(['status' => 'ok']);
});

Route::prefix('/v1')->group(function () {
    Route::apiResource('/alunos', AlunoController::class);
    Route::apiResource('/professores', ProfessorController::class);
    Route::apiResource('/cursos', CursoController::class);
    Route::apiResource('/matriculas', MatriculaController::class);
    Route::apiResource('/disciplinas', DisciplinaController::class);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
