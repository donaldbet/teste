<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('disciplinas', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('descricao');
            $table->foreignId('professor_id')->constrained('professores')->onDelete('cascade'); // Chave estrangeira para a tabela 'professores'
            $table->foreignId('curso_id')->constrained('cursos')->onDelete('cascade'); // Chave estrangeira para a tabela 'cursos'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disciplinas');
    }
};
