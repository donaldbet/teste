<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_auth_user_success(): void
    {
        $user = User::factory()->create([
            'email' => 'teste@email.com',
            'password' => bcrypt('senha123')
        ]);

        $response = $this->postJson('/api/v1/login', [
            'email' => 'teste@email.com',
            'password' => 'senha123'
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['token']);
    }

    public function test_auth_user_fail(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'naoexiste@gmail.com',
            'password' => 'senha123'
        ]);
    }
}
