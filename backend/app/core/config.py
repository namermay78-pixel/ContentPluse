"""Application configuration using Pydantic Settings"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # App
    app_name: str = "ContentPulse"
    app_version: str = "0.1.0"
    debug: bool = True
    
    # Server
    api_v1_str: str = "/api/v1"
    
    # Gemini API
    gemini_api_key: Optional[str] = None
    
    # CORS
    allowed_origins: list = ["http://localhost:3000", "http://localhost:5173"]
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
