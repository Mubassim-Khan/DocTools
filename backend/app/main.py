from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import convert
from app.routes import analyze

app = FastAPI(title="DocTools API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://m-doctools.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,         
    allow_credentials=True,
    allow_methods=["*"],           
    allow_headers=["*"],           
)

# register routes
app.include_router(convert.router)
app.include_router(analyze.router)

@app.get("/")
def root():
    return {"message": "Hello from DocTools API"}
