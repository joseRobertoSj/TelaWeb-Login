/**
 * API Service para integração com o Backend Neural Core
 * 
 * Este arquivo deve ser copiado para FrontEnd/src/services/api.ts
 * ou ajustado conforme necessário para sua estrutura do projeto
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

interface RegisterResponse extends User {}

interface User {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

interface RegisterData {
  nome: string;
  email: string;
  cargo: string;
  senha: string;
  confirmar_senha: string;
}

interface LoginData {
  username: string;
  password: string;
}

// Token Management
const getToken = (): string | null => localStorage.getItem("access_token");
const setToken = (token: string): void => localStorage.setItem("access_token", token);
const removeToken = (): void => localStorage.removeItem("access_token");

const getUser = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
const setUser = (user: User): void => localStorage.setItem("user", JSON.stringify(user));
const removeUser = (): void => localStorage.removeItem("user");

// Headers helper
const getHeaders = (includeAuth = true): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

// API Calls
export const apiService = {
  /**
   * Registrar novo usuário
   */
  async register(data: RegisterData): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Erro ao registrar usuário");
    }

    return response.json();
  },

  /**
   * Fazer login
   */
  async login(data: LoginData): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Erro ao fazer login");
    }

    const responseData: LoginResponse = await response.json();
    
    // Armazenar token e usuário
    setToken(responseData.access_token);
    setUser(responseData.user);

    return responseData;
  },

  /**
   * Obter dados do usuário atual
   */
  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: getHeaders(true),
    });

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        removeUser();
        throw new Error("Sessão expirada. Faça login novamente.");
      }
      throw new Error("Erro ao obter dados do usuário");
    }

    const user: User = await response.json();
    setUser(user);
    return user;
  },

  /**
   * Fazer logout
   */
  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: getHeaders(true),
      });
    } catch (error) {
      console.warn("Erro ao notificar logout no servidor", error);
    }

    removeToken();
    removeUser();
  },

  /**
   * Listar todos os usuários (requer autenticação)
   */
  async listUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/auth/users`, {
      method: "GET",
      headers: getHeaders(true),
    });

    if (!response.ok) {
      throw new Error("Erro ao listar usuários");
    }

    return response.json();
  },

  /**
   * Verificar health da API
   */
  async health(): Promise<{ status: string; service: string; version: string }> {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      headers: getHeaders(false),
    });

    if (!response.ok) {
      throw new Error("API indisponível");
    }

    return response.json();
  },
};

// Auth Store (simples, ajuste conforme sua state management)
export const authStore = {
  isAuthenticated(): boolean {
    return !!getToken();
  },

  currentUser(): User | null {
    return getUser();
  },

  token(): string | null {
    return getToken();
  },

  logout(): void {
    removeToken();
    removeUser();
  },
};
