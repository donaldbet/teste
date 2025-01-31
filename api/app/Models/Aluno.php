<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Aluno extends Model
{
    use SoftDeletes, HasFactory;
    protected $fillable = ['nome', 'email', 'data_nascimento'];
    protected $dates = ['data_nascimento'];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
    protected $casts = [
        'data_nascimento' => 'date'
    ];


    public function alunoMaisVelho()
    {
        # TODO Arrumar lógica para retornar apenas a idade
        return Aluno::whereNotNull('data_nascimento')->orderBy('data_nascimento', 'asc')->value('nome');
    }

    public function alunoMaisNovo()
    {
        # TODO Arrumar lógica para retornar apenas a idade
        return Aluno::whereNotNull('data_nascimento')->orderBy('data_nascimento', 'desc')->value('nome');
    }

    public function mediaIdade()
    {
        $alunos = Aluno::whereNotNull('data_nascimento')->get();
        if ($alunos->isEmpty()) {
            return 0;
        }
        $somaIdades = 0;
        foreach ($alunos as $aluno) {
            $somaIdades += $aluno->data_nascimento->age;
        }
        return $somaIdades / $alunos->count();
    }

    public function infoDashboard()
    {
        return [
            'aluno_mais_velho' => $this->alunoMaisVelho(),
            'aluno_mais_novo' => $this->alunoMaisNovo(),
            'media_idade' => $this->mediaIdade(),
            'total_alunos' => Aluno::count()
        ];
    }
}
