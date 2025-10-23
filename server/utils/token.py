from jose import jwt, JWTError
from datetime import datetime, timezone, timedelta

SECRET_KEY = "secret"
ALGORITHM = "HS256"

def create_token(sub: str, expiry: int = 15):
    
    
    to_encode = {"sub": sub, "exp": datetime.now(timezone.utc) + timedelta(minutes=expiry)}
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)