from fastapi import WebSocket

class SocketManager():
    
    def __init__(self):
        self.active_connections: list[WebSocket] = []
        
    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active_connections.append(ws)
        
    def disconnect(self, ws: WebSocket):
        self.active_connections.remove(ws)
        
    async def broadcast(self, data: dict[str, str]):
        for connection in self.active_connections:
            await connection.send_json(data)