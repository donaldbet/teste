# Guia de Instalação do Laravel
📌 Sobre o Projeto

Este projeto foi desenvolvido utilizando o framework Laravel, para o teste de vaga na donald-bet.

## Pré-requisitos
Certifique-se de que seu sistema atenda aos seguintes requisitos:

- PHP (>= 8.0)
- Composer (versão mais recente)
- Laravel Installer (opcional)

## Passos para Instalação

### 1. Clonar o Repositório
```bash
git clone <repository_url>
cd <project_directory>
```

### 2. Instalar Dependências
```bash
composer install
```

### 3. Copiar Arquivo de Ambiente
```bash
cp .env.example .env
```

### 4. Gerar Chave da Aplicação
```bash
php artisan key:generate
```

### 5. Banco de Dados
Crie um banco de dados no MySQL e configure as credenciais no arquivo .env:
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=seu_banco_de_dados
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

Em seguida, execute as migrations:
```bash
php artisan migrate
```

### 6. Cadastro de administrador
Para criar o usuário administrador, execute:
```bash
php artisan app:insert-admin-user
```

### 7. Iniciar Servidor de Desenvolvimento

```bash
php artisan serve
```

### 8. Testes unitários
### Configuração do ambiente de testes
1. Criação do arquivo .env.testing

O Laravel permite um ambiente de testes separado. Para configurá-lo, copie o arquivo .env para .env.testing:
```bash
cp .env .env.testing
```
2. Edite o arquivo .env.testing e ajuste a conexão com o banco de testes:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_testing
DB_USERNAME=root
DB_PASSWORD=
```
Certifique-se de criar o banco de dados laravel_testing antes de rodar os testes.

3. Rodar as migrations para o banco de testes
```bash
php artisan migrate --env=testing
```

4. Para rodar os testes unitários:
```bash
php artisan test
```


### 9. Login
Todo aluno criado tem seu login definido da seguinte forma:
```bash
email: (email cadastrado)
senha: 123456
```

Ao fazer login, ele pode alterar a senha.

Já o administrador está cadastrado como:
```bash
email: anthoniusmiguel@gmail.com
senha: anthoniusdev
```

## ✅ Requisitos Atendidos
### 📌 Funcionalidades Implementadas
- CRUD de Áreas de Cursos (Criar, Listar, Editar e Visualizar áreas como Biologia, Química, Física)
- CRUD de Cursos (Título, Descrição, Data de Início e Data de Fim)
- CRUD de Professores (Nome, Email)
- CRUD de Disciplinas (Título, Descrição, Curso associado, Professor associado)
- CRUD de Alunos (Nome, Email, Data de Nascimento)
- CRUD de Matrículas (Matrícula de Alunos em Cursos)
- Autenticação de Administradores e Alunos (Duas áreas separadas):
  - Administrador gerencia matrículas e cadastros
  - Aluno pode atualizar seus dados
- Filtros na listagem de alunos (Consulta pelo nome e email)
- Relatórios de alunos por faixa etária (Idade média, aluno mais novo e mais velho por curso)
  
### 🛠️ Tecnologias Utilizadas
 - Laravel 11 como framework backend
 - React.js para o frontend
 - Composer para gerenciamento de dependências
 - Banco de dados estruturado com Migrations

### 🚀 Extras Implementados (Plus++)
- Testes Unitários (Cobertura de pelo menos 3 funcionalidades principais)
- Padrões de Orientação a Objetos bem aplicados
- Responsividade (UI adaptável a diferentes telas, como mobile)
- API Laravel bem estruturada (Para comunicação entre frontend e backend)

## Comandos Adicionais

- Limpar cache:
  ```bash
  php artisan cache:clear
  ```
- Limpar cache de configuração:
  ```bash
  php artisan config:clear
  ```

## Acessando a Aplicação
Após iniciar o servidor, você pode acessar a aplicação em:
```
http://localhost:8000
```

