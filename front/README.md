# Guia de Instalação de Aplicação React

## Pré-requisitos
Certifique-se de que seu sistema atenda aos seguintes requisitos:

- Node.js (>= 14.x)
- npm ou yarn
- Git (opcional, para clonar o repositório)

## Passos para Instalação

### 1. Clonar o Repositório
```bash
git clone https://github.com/anthoniusdev/teste-imbr.git
cd teste-imbr
cd front
```

### 2. Instalar Dependências
Com npm:
```bash
npm install
```
Com yarn:
```bash
yarn install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto e adicione o seguinte comando:
```ini
VITE_API_URL=http://localhost:8000/api/v1
```

### 4. Iniciar o Servidor de Desenvolvimento
Com npm:
```bash
npm run dev
```
Com yarn:
```bash
yarn run dev
```

A aplicação será iniciada e estará acessível em:
```bash
http://localhost:5173/admin
```
