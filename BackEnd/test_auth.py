import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from main import app, Base
from database import get_db
from config import settings

# Create test database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test_db.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


class TestAuth:
    """Test authentication endpoints."""
    
    def test_health_check(self):
        """Test health check endpoint."""
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json()["status"] == "ok"
    
    def test_register_user(self):
        """Test user registration."""
        response = client.post(
            "/auth/register",
            json={
                "nome": "Test User",
                "email": "test@example.com",
                "cargo": "Tester",
                "senha": "password123",
                "confirmar_senha": "password123"
            }
        )
        assert response.status_code == 201
        data = response.json()
        assert data["email"] == "test@example.com"
        assert data["nome"] == "Test User"
    
    def test_register_password_mismatch(self):
        """Test registration with mismatched passwords."""
        response = client.post(
            "/auth/register",
            json={
                "nome": "Test User",
                "email": "test2@example.com",
                "cargo": "Tester",
                "senha": "password123",
                "confirmar_senha": "password456"
            }
        )
        assert response.status_code == 400
        assert "do not match" in response.json()["detail"].lower()
    
    def test_register_duplicate_email(self):
        """Test registration with duplicate email."""
        # First registration
        client.post(
            "/auth/register",
            json={
                "nome": "Test User",
                "email": "unique@example.com",
                "cargo": "Tester",
                "senha": "password123",
                "confirmar_senha": "password123"
            }
        )
        
        # Duplicate email
        response = client.post(
            "/auth/register",
            json={
                "nome": "Another User",
                "email": "unique@example.com",
                "cargo": "Developer",
                "senha": "password123",
                "confirmar_senha": "password123"
            }
        )
        assert response.status_code == 409
    
    def test_login_success(self):
        """Test successful login."""
        # Register user first
        client.post(
            "/auth/register",
            json={
                "nome": "Login Test",
                "email": "login@example.com",
                "cargo": "Test",
                "senha": "password123",
                "confirmar_senha": "password123"
            }
        )
        
        # Login
        response = client.post(
            "/auth/login",
            json={
                "username": "login@example.com",
                "password": "password123"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        assert data["user"]["email"] == "login@example.com"
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials."""
        response = client.post(
            "/auth/login",
            json={
                "username": "nonexistent@example.com",
                "password": "wrongpassword"
            }
        )
        assert response.status_code == 401


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
