import requests
import json

BASE_URL = "http://localhost:8000"

# Test 1: Health check
print("=" * 50)
print("TEST 1: Health Check")
print("=" * 50)
response = requests.get(f"{BASE_URL}/health")
print(f"Status Code: {response.status_code}")
print(f"Response: {json.dumps(response.json(), indent=2)}\n")

# Test 2: Register a new user
print("=" * 50)
print("TEST 2: Register New User")
print("=" * 50)
register_data = {
    "nome": "João Silva",
    "email": "joao@example.com",
    "cargo": "Desenvolvedor",
    "senha": "senha123",
    "confirmar_senha": "senha123"
}
response = requests.post(f"{BASE_URL}/auth/register", json=register_data)
print(f"Status Code: {response.status_code}")
print(f"Response: {json.dumps(response.json(), indent=2)}\n")

# Test 3: Login
print("=" * 50)
print("TEST 3: Login")
print("=" * 50)
login_data = {
    "username": "joao@example.com",
    "password": "senha123"
}
response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
print(f"Status Code: {response.status_code}")
response_json = response.json()
print(f"Response: {json.dumps(response_json, indent=2)}\n")

# Test 4: Get current user (with token)
if response.status_code == 200:
    token = response_json.get("access_token")
    print("=" * 50)
    print("TEST 4: Get Current User")
    print("=" * 50)
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/auth/me", headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}\n")
