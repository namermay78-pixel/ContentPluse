"""In-memory storage for MVP - using Python data structures instead of database"""
from typing import Dict, List, Optional
from datetime import datetime
from uuid import uuid4


class InMemoryDatabase:
    """Simple in-memory database for MVP phase"""
    
    def __init__(self):
        """Initialize in-memory storage"""
        self.reports: Dict[str, dict] = {}
        self.platforms: Dict[str, dict] = {}
        self.users: Dict[str, dict] = {}
        
    def reset(self):
        """Reset all data - useful for testing"""
        self.reports.clear()
        self.platforms.clear()
        self.users.clear()


# Global database instance
db = InMemoryDatabase()


def get_db() -> InMemoryDatabase:
    """Dependency injection for database"""
    return db


# ============== Report Operations ==============

def create_report(filename: str, file_size: int, content_type: str) -> dict:
    """Create a new report record"""
    report_id = str(uuid4())
    report = {
        "id": report_id,
        "filename": filename,
        "file_size": file_size,
        "content_type": content_type,
        "created_at": datetime.utcnow().isoformat(),
        "status": "uploaded",
    }
    db.reports[report_id] = report
    return report


def get_report(report_id: str) -> Optional[dict]:
    """Get a report by ID"""
    return db.reports.get(report_id)


def list_reports() -> List[dict]:
    """List all reports"""
    return list(db.reports.values())


def delete_report(report_id: str) -> bool:
    """Delete a report"""
    if report_id in db.reports:
        del db.reports[report_id]
        return True
    return False


# ============== Platform Operations ==============

def create_platform_connection(platform_name: str, account_email: str) -> dict:
    """Create a platform connection record"""
    connection_id = str(uuid4())
    connection = {
        "id": connection_id,
        "platform": platform_name,
        "account_email": account_email,
        "connected_at": datetime.utcnow().isoformat(),
        "status": "connected",
    }
    db.platforms[connection_id] = connection
    return connection


def get_platform_connection(connection_id: str) -> Optional[dict]:
    """Get a platform connection by ID"""
    return db.platforms.get(connection_id)


def list_platform_connections() -> List[dict]:
    """List all platform connections"""
    return list(db.platforms.values())


def delete_platform_connection(connection_id: str) -> bool:
    """Delete a platform connection"""
    if connection_id in db.platforms:
        del db.platforms[connection_id]
        return True
    return False


# ============== User Operations ==============

def create_user(email: str, name: str) -> dict:
    """Create a new user"""
    user_id = str(uuid4())
    user = {
        "id": user_id,
        "email": email,
        "name": name,
        "created_at": datetime.utcnow().isoformat(),
    }
    db.users[user_id] = user
    return user


def get_user_by_email(email: str) -> Optional[dict]:
    """Get user by email"""
    for user in db.users.values():
        if user["email"] == email:
            return user
    return None


def list_users() -> List[dict]:
    """List all users"""
    return list(db.users.values())
