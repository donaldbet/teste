<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreateUser extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;

    public function test_creating_user(): void
    {
        $user = User::factory()->create([
            'name' => 'Teste User',
            'email' => 'teste@email.com',
            'password' => bcrypt('senha123')
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'teste@email.com'
        ]);
    }
}
