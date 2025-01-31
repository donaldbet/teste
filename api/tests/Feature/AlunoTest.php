<?php

namespace Tests\Feature;

use App\Models\Aluno;
use App\Models\User;
use Tests\TestCase;

class AlunoTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_update_aluno(): void
    {
        $user = User::factory()->create();

        $token = $user->createToken('authToken')->plainTextToken;

        $aluno = Aluno::factory()->create();

        $updatedData = [
            'nome' => 'João Pereira Silva',
            'email' => 'joao.pereira.silva@example.com',
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson('/api/v1/aluno/' . $aluno->id, $updatedData);

        $response->assertStatus(200)
            ->assertJson([
                'data' => $updatedData
            ]);
    }
}
