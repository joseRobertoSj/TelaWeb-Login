from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


# Request/Response schemas
class UserRegister(BaseModel):
    """Schema for user registration."""
    nome: str = Field(..., min_length=3, max_length=255)
    email: str = Field(..., min_length=5)  # Simplified email validation
    cargo: str = Field(..., min_length=2, max_length=50)
    senha: str = Field(..., min_length=6, max_length=255)
    confirmar_senha: str = Field(..., min_length=6, max_length=255)
    
    class Config:
        json_schema_extra = {
            "example": {
                "nome": "João Silva",
                "email": "joao@example.com",
                "cargo": "Desenvolvedor",
                "senha": "senha123",
                "confirmar_senha": "senha123"
            }
        }


class UserLogin(BaseModel):
    """Schema for user login."""
    username: str = Field(..., min_length=3, max_length=255, description="Username or email")
    password: str = Field(..., min_length=6, max_length=255)
    
    class Config:
        json_schema_extra = {
            "example": {
                "username": "joao@example.com",
                "password": "senha123"
            }
        }


class UserResponse(BaseModel):
    """Schema for user response."""
    id: int
    nome: str
    email: str
    cargo: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "nome": "João Silva",
                "email": "joao@example.com",
                "cargo": "Desenvolvedor",
                "is_active": True,
                "created_at": "2024-01-01T10:00:00",
                "updated_at": None
            }
        }


class LoginResponse(BaseModel):
    """Schema for login response."""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
    
    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "user": {
                    "id": 1,
                    "nome": "João Silva",
                    "email": "joao@example.com",
                    "cargo": "Desenvolvedor",
                    "is_active": True,
                    "created_at": "2024-01-01T10:00:00",
                    "updated_at": None
                }
            }
        }


class TokenData(BaseModel):
    """Schema for token payload data."""
    email: Optional[str] = None
    user_id: Optional[int] = None


class Message(BaseModel):
    """Generic message response."""
    message: str
    detail: Optional[str] = None
