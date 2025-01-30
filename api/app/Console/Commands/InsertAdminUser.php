<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class InsertAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:insert-admin-user';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $user = new \App\Models\User();
        $user->name = 'Admin';
        $user->email = 'anthoniusmiguel@gmail.com';
        $user->password = \Hash::make('anthoniusdev');
        $user->isAdministrator = true;
        echo "Inserindo usuário admin...\n";
        $user->save();
        echo "Usuário admin inserido com sucesso\n";
    }
}
