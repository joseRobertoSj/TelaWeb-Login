# Neural Core Backend

Backend API para a plataforma Neural Core com autenticação JWT.

## Estrutura do Projeto

```
BackEnd/
├── main.py              # Aplicação principal FastAPI
├── config.py            # Configurações da aplicação
├── database.py          # Configuração do banco de dados
├── models.py            # Modelos SQLAlchemy
├── schemas.py           # Schemas Pydantic (validação)
├── auth.py              # Lógica de autenticação JWT
├── routes.py            # Rotas/Endpoints da API
├── requirements.txt     # Dependências Python
├── .env.example         # Exemplo de variáveis de ambiente
└── .env                 # Variáveis de ambiente (não commitar)
```

## Instalação

### 1. Criar ambiente virtual

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/macOS
python3 -m venv venv
source venv/bin/activate
```

### 2. Instalar dependências

```bash
pip install -r requirements.txt
```

### 3. Configurar variáveis de ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env com suas configurações
```

## Rodar a Aplicação

```bash
# Com reload para desenvolvimento
python main.py

# Ou com uvicorn
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

A API estará disponível em: `http://localhost:8000`

## Documentação das APIs

- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc
- **OpenAPI JSON**: http://localhost:8000/api/openapi.json

## Endpoints Disponíveis

### Autenticação

#### Registrar novo usuário
```
POST /auth/register
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@example.com",
  "cargo": "Desenvolvedor",
  "senha": "senha123",
  "confirmar_senha": "senha123"
}
```

**Response (201):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@example.com",
  "cargo": "Desenvolvedor",
  "is_active": true,
  "created_at": "2024-01-01T10:00:00",
  "updated_at": null
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "username": "joao@example.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "cargo": "Desenvolvedor",
    "is_active": true,
    "created_at": "2024-01-01T10:00:00",
    "updated_at": null
  }
}
```

#### Obter usuário atual
```
GET /auth/me
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@example.com",
  "cargo": "Desenvolvedor",
  "is_active": true,
  "created_at": "2024-01-01T10:00:00",
  "updated_at": null
}
```

#### Logout
```
POST /auth/logout
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Logged out successfully",
  "detail": "Token should be removed from client"
}
```

#### Listar usuários
```
GET /auth/users
Authorization: Bearer {token}
```

**Response (200):**
```json
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "cargo": "Desenvolvedor",
    "is_active": true,
    "created_at": "2024-01-01T10:00:00",
    "updated_at": null
  }
]
```

### Saúde

#### Health Check
```
GET /health
```

**Response (200):**
```json
{
  "status": "ok",
  "service": "Neural Core API",
  "version": "1.0.0"
}
```

## Integração com Frontend

No arquivo de chamadas API do frontend, adicione:

```javascript
const API_BASE_URL = "http://localhost:8000";

// Login
const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: email,
    password: password
  })
});

const { access_token, user } = await loginResponse.json();
localStorage.setItem("token", access_token);

// Requisições autenticadas
fetch(`${API_BASE_URL}/auth/me`, {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
});
```

## Segurança

- Senhas são hasheadas com bcrypt
- JWT para autenticação stateless
- CORS configurado
- Validação em todos os endpoints
- Variáveis sensíveis em .env (não commitar)

## Desenvolvimento

Para adicionar novos endpoints:

1. Adicione schemas em `schemas.py`
2. Crie as funções de negócio
3. Adicione rotas em `routes.py`
4. Registre o router em `main.py`

## Testes

```bash
pytest
```

## Notas

- Em produção, altere `SECRET_KEY` no .env
- Configure `DATABASE_URL` para PostgreSQL ou MySQL
- Implemente rate limiting
- Adicione logging
- Configure HTTPS
- Implemente refresh tokens
- Adicione validação de email
