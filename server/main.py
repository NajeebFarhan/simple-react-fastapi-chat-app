from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
from .socket_manager import SocketManager

app = FastAPI()
manager = SocketManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def index():
    return {"msg": "success"}


@app.websocket("/ws")
async def websocket(ws: WebSocket):
    await manager.connect(ws)
    
    username = await ws.receive_text()
    await manager.broadcast({ "username": "system", "msg": f"{username} has joined the chat" })
    
    try: 
        while True:
            data = await ws.receive_json()
            
            await manager.broadcast(data)
                
    except WebSocketDisconnect:
        manager.disconnect(ws)
        await manager.broadcast({ "username": "system", "msg": "someone has left the chat" })
