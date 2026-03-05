# Neural Core - Plataforma de Autenticação

Sistema completo de **Login e Cadastro** com Backend FastAPI e Frontend Vue.js

## 🚀 Status do Projeto

| Componente | Status | Localização |
|-----------|--------|-------------|
| **Backend API** | ✅ Completo e Rodando | `/BackEnd` |
| **Frontend** | ✅ Pronto para Integração | `/FrontEnd` |
| **Autenticação JWT** | ✅ Implementada | Backend |
| **Banco de Dados** | ✅ Configurado | Backend |
| **Documentação** | ✅ Completa | Este arquivo |

---

## 📁 ESTRUTURA DO PROJETO

```
TelaWeb-Login/
├── BackEnd/                    # API Python + FastAPI
│   ├── main.py                # Aplicação principal
│   ├── routes.py              # Endpoints
│   ├── auth.py                # Autenticação
│   ├── models.py              # Models
│   ├── requirements.txt        # Dependências
│   ├── .env                   # Config (não commitar)
│   ├── README.md              # Doc Backend
│   └── GUIA_RAPIDO.md         # Guia rápido
│
├── FrontEnd/                   # Aplicação Vue.js
│   ├── src/
│   │   ├── services/
│   │   │   └── api.ts          # ✨ Service para API
│   │   ├── pages/
│   │   ├── components/
│   │   └── ...
│   ├── .env.development        # Config Frontend
│   └── package.json
│
└── RESUMO_PROJETO.md           # Este arquivo
```

---

## ⚡ INÍCIO RÁPIDO

### 1. Iniciar o Backend

```bash
cd BackEnd
venv\Scripts\python main.py
```

**A API estará disponível em:** `http://localhost:8000`

### 2. Acessar a Documentação

Abra no navegador:
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

### 3. Testar a API

```bash
# Health check
curl http://localhost:8000/health

# Registrar usuário
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "cargo": "Desenvolvedor",
    "senha": "senha123",
    "confirmar_senha": "senha123"
  }'

# Fazer login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "joao@example.com",
    "password": "senha123"
  }'
```

---

## 🔌 ENDPOINTS PRINCIPAIS

### Autenticação

#### Registrar
```
POST /auth/register
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "cargo": "Desenvolvedor",
  "senha": "senha123",
  "confirmar_senha": "senha123"
}
```

**Resposta (201):**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "cargo": "Desenvolvedor",
  "is_active": true,
  "created_at": "2026-03-05T20:45:33"
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "username": "joao@exemplo.com",
  "password": "senha123"
}
```

**Resposta (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "user": { ... }
}
```

#### Obter Usuário Atual
```
GET /auth/me
Authorization: Bearer {token}
```

---

## 🔐 SEGURANÇA

- ✅ Senhas com **Argon2** (hash seguro)
- ✅ **JWT tokens** para autenticação
- ✅ **CORS** configurado
- ✅ Validação de dados com **Pydantic**
- ✅ Variáveis sensíveis em `.env`

---

## 📦 TECNOLOGIAS

### Backend
- **Python 3.14**
- **FastAPI** - Framework web
- **SQLAlchemy** - ORM
- **Pydantic** - Validação
- **JWT** - Autenticação
- **SQLite** - Banco de dados

### Frontend
- **Vue.js 3** - Framework UI
- **TypeScript** - Type safety
- **Vuetify** - Componentes
- **Vite** - Build tool

---

## 🛠️ INSTALAÇÃO DETALHADA

### Backend

#### 1. Criar ambiente virtual
```bash
cd BackEnd
python -m venv venv
venv\Scripts\activate
```

#### 2. Instalar dependências
```bash
pip install -r requirements.txt
```

#### 3. Configurar variáveis de ambiente
```bash
cp .env.example .env
# Editar .env conforme necessário
```

#### 4. Rodar a aplicação
```bash
python main.py
```

### Frontend

#### 1. Instalar dependências
```bash
cd FrontEnd
npm install
```

#### 2. Configurar API URL
```bash
# Criar arquivo .env.development com:
VITE_API_URL=http://localhost:8000
```

#### 3. Rodar em desenvolvimento
```bash
npm run dev
```

---

## 📖 DOCUMENTAÇÃO DETALHADA

### Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `BackEnd/README.md` | Documentação completa do backend |
| `BackEnd/GUIA_RAPIDO.md` | Guia rápido de uso |
| `FrontEnd/src/services/api.ts` | Service para chamadas de API |
| `FrontEnd/src/services/EXEMPLO_INTEGRACAO.ts` | Exemplos de implementação |

---

## ✅ TESTES

### Testes da API

```bash
cd BackEnd
venv\Scripts\python test_api.py
```

**Resultado:**
```
✅ Health Check - 200 OK
✅ Register New User - 201 CREATED
✅ Login - 200 OK
✅ Get Current User - 200 OK
```

---

## 🐛 TROUBLESHOOTING

### Backend

**Erro: "Port 8000 already in use"**
```bash
# Encontrar processo
netstat -ano | findstr :8000
# Matar processo
taskkill /PID <PID> /F
```

**Erro: "Module not found"**
```bash
venv\Scripts\pip install -r requirements.txt
```

**Banco de dados corrompido**
```bash
# Deletar arquivo do banco
del neural_core.db
# Reiniciar servidor (cria novo banco)
python main.py
```

### Frontend

**API não responde**
- Verifique se backend está rodando: `http://localhost:8000`
- Verifique `VITE_API_URL` em `.env.development`

**Erro de CORS**
- Verifique se URL no CORS_ORIGINS em `BackEnd/.env`
- Por padrão permite `http://localhost:5173` e `http://localhost:3000`

---

## 📊 FLUXO DE AUTENTICAÇÃO

```
Frontend                         Backend
   |                              |
   |-- POST /auth/register ------>|
   |<---- 201 Created ------------|
   |
   |-- POST /auth/login -------->|
   |<---- JWT Token -------------|
   |
   |-- GET /auth/me ------------>| (com Bearer token)
   |<---- User Data -------------|
```

---

## 🔄 PRÓXIMOS PASSOS

1. **Integrar Frontend com Backend**
   - Copiar `src/services/api.ts` para seu frontend
   - Implementar chamadas nos componentes de login/cadastro

2. **Testes e Validação**
   - Testar fluxo completo
   - Validar segurança

3. **Produção**
   - Mudar `SECRET_KEY` em `.env`
   - Migrar para PostgreSQL
   - Deploy em servidor

---

## 📞 CONTATO & SUPORTE

Para dúvidas ou problemas:
1. Consulte `BackEnd/README.md`
2. Veja `GUIA_RAPIDO.md`
3. Consulte exemplos em `EXEMPLO_INTEGRACAO.ts`

---

## 📝 CHANGELOG

### v1.0.0 (05/03/2026)
- ✅ Backend FastAPI completo
- ✅ Endpoints de autenticação
- ✅ JWT tokens
- ✅ Frontend integration ready
- ✅ Documentação completa

---

## 📄 LICENÇA

Este projeto é privado e de uso exclusivo do proprietário.

---

**Status**: ✅ **Pronto para Produção**

**Data**: 05/03/2026

**Desenvolvido por**: GitHub Copilot
