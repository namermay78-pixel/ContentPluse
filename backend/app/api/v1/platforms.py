"""Platform connection endpoints"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.db import (
    create_platform_connection,
    get_platform_connection,
    list_platform_connections,
    delete_platform_connection,
)

router = APIRouter(prefix="/platforms", tags=["platforms"])


class PlatformConnectionRequest(BaseModel):
    """Request model for platform connection"""
    platform: str
    account_email: str


class PlatformConnectionResponse(BaseModel):
    """Response model for platform connection"""
    id: str
    platform: str
    account_email: str
    connected_at: str
    status: str


@router.post("/connect")
async def connect_platform(request: PlatformConnectionRequest):
    """
    Connect to a platform.
    
    Args:
        request: Platform connection details
        
    Returns:
        dict: Connection confirmation
    """
    connection = create_platform_connection(
        platform_name=request.platform,
        account_email=request.account_email,
    )
    
    return {
        "success": True,
        "message": f"Successfully connected to {request.platform}",
        "connection": connection,
    }


@router.get("")
async def get_connections():
    """Get all platform connections"""
    connections = list_platform_connections()
    return {
        "success": True,
        "count": len(connections),
        "connections": connections,
    }


@router.get("/{connection_id}")
async def get_connection_details(connection_id: str):
    """Get details of a platform connection"""
    connection = get_platform_connection(connection_id)
    if not connection:
        raise HTTPException(status_code=404, detail="Connection not found")
    
    return {
        "success": True,
        "connection": connection,
    }


@router.delete("/{connection_id}")
async def disconnect_platform(connection_id: str):
    """Disconnect from a platform"""
    if delete_platform_connection(connection_id):
        return {
            "success": True,
            "message": "Platform disconnected successfully",
        }
    else:
        raise HTTPException(status_code=404, detail="Connection not found")
