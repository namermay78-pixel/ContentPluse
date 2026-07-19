"""Database module"""
from app.db.memory import (
    InMemoryDatabase,
    get_db,
    create_report,
    get_report,
    list_reports,
    delete_report,
    create_platform_connection,
    get_platform_connection,
    list_platform_connections,
    delete_platform_connection,
    create_user,
    get_user_by_email,
    list_users,
)

__all__ = [
    "InMemoryDatabase",
    "get_db",
    "create_report",
    "get_report",
    "list_reports",
    "delete_report",
    "create_platform_connection",
    "get_platform_connection",
    "list_platform_connections",
    "delete_platform_connection",
    "create_user",
    "get_user_by_email",
    "list_users",
]
