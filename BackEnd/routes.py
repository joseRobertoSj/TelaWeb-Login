from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from database import get_db
from models import User
from schemas import UserRegister, UserLogin, LoginResponse, UserResponse, Message
from auth import (
    hash_password,
    authenticate_user,
    create_access_token,
    get_current_user
)
from config import settings

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user"
)
async def register(
    user_data: UserRegister,
    db: Session = Depends(get_db)
):
    """
    Register a new user account.
    
    - **nome**: Full name (3-255 characters)
    - **email**: Email address (must be unique)
    - **cargo**: Position/Role
    - **senha**: Password (6-255 characters)
    - **confirmar_senha**: Password confirmation (must match senha)
    """
    
    # Validate password confirmation
    if user_data.senha != user_data.confirmar_senha:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )
    
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered"
        )
    
    try:
        # Create new user
        new_user = User(
            nome=user_data.nome,
            email=user_data.email,
            cargo=user_data.cargo,
            hashed_password=hash_password(user_data.senha)
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        return new_user
    
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with this email already exists"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating user account"
        )


@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
    summary="User login"
)
async def login(
    credentials: UserLogin,
    db: Session = Depends(get_db)
):
    """
    Login with username/email and password.
    
    Returns JWT access token and user information.
    
    - **username**: Email or username
    - **password**: User password
    """
    
    # Authenticate user
    user = authenticate_user(db, credentials.username, credentials.password)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    # Create JWT token
    access_token_expires = timedelta(
        minutes=settings.access_token_expire_minutes
    )
    access_token = create_access_token(
        data={
            "sub": user.email,
            "user_id": user.id
        },
        expires_delta=access_token_expires
    )
    
    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.model_validate(user)
    )


@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get current user"
)
async def get_me(
    current_user: User = Depends(get_current_user)
):
    """
    Get current authenticated user information.
    
    Requires valid JWT token in Authorization header.
    """
    return UserResponse.model_validate(current_user)


@router.post(
    "/logout",
    response_model=Message,
    summary="User logout"
)
async def logout(
    current_user: User = Depends(get_current_user)
):
    """
    Logout user (mainly for client-side cleanup).
    
    In JWT-based auth, the token is invalidated on the client side.
    """
    return Message(
        message="Logged out successfully",
        detail="Token should be removed from client"
    )


@router.get(
    "/users",
    response_model=list[UserResponse],
    summary="List all users (admin only)"
)
async def list_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    List all registered users.
    
    Note: In production, add admin role check.
    """
    users = db.query(User).filter(User.is_active == True).all()
    return [UserResponse.model_validate(user) for user in users]
