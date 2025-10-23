from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect, Form, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from typing import Annotated

from socket_manager import SocketManager
# from db import get_db
# from models.user import User
# from utils.password import hash_password, verify_password
# from utils.token import create_token


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

# TODO: implement authentication into the chat app

# @app.post("/signup")
# async def signup(username: Annotated[str, Form()], password: Annotated[str, Form()], db: Session = Depends(get_db)):
#     if db.query(User).filter(User.username == username).first():
#         raise HTTPException(status_code=400, detail="User already exists")

#     account = User(username=username, hashed_password=hash_password(password))
#     db.add(account)
#     db.commit()
#     db.refresh(account)
    
#     return account


# @app.post("/login")
# async def login(username: Annotated[str, Form()], password: Annotated[str, Form()], db: Session = Depends(get_db)):
    
#     user = db.query(User).filter(User.username == username).first()

#     if not user or not verify_password(password, user.hashed_password):
#         raise HTTPException(status_code=401, detail="Invalid Credentials")
    
#     token = create_token(user.user)
    
    
    

@app.websocket("/ws")
async def websocket(ws: WebSocket):
    await manager.connect(ws)
    
    data = await ws.receive_json()
    await manager.broadcast({ "username": "system", "color": "blue", "msg": f"<span style='color:{data['color']}'>{data['username']}</span> has joined the chat.", "role": "system"})
    
    try: 
        while True:
            data = await ws.receive_json()
     
            await manager.broadcast(data)
                
    except WebSocketDisconnect:
        manager.disconnect(ws)
        await manager.broadcast({ "username": "system", "color": "blue", "msg": f"<span style='color:{data['color']}'>{data['username']}</span> has left the chat.", "role": "system"})