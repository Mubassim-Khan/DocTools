from fastapi import FastAPI
from app.routes import convert

app = FastAPI(title="Document Converter API")

# register routes
app.include_router(convert.router)

@app.get("/")
def root():
    return {"message": "Welcome to Document Converter API"}
