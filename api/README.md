# Guia de Instalação do Laravel

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
O banco de dados utilizado nesta aplicação foi o sqlite, portanto, já está alimentado.


### 6. Iniciar Servidor de Desenvolvimento
```bash
php artisan serve
```

### 7. Login
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

## Comandos Adicionais

- Limpar cache:
  ```bash
  php artisan cache:clear
  ```
- Limpar cache de configuração:
  ```bash
  php artisan config:clear
  ```
- Criar link de armazenamento (para uploads de arquivos):
  ```bash
  php artisan storage:link
  ```

## Acessando a Aplicação
Após iniciar o servidor, você pode acessar a aplicação em:
```
http://localhost:8000
```

