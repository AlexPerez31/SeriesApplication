from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from app.core.exceptions import validation_exception_handler
from fastapi.middleware.cors import CORSMiddleware


from app.routes import directors, series

app = FastAPI(title="TV Series API")

app.add_exception_handler(RequestValidationError, validation_exception_handler)

app.include_router(directors.router, prefix="/directors", tags=["Directors"])
app.include_router(series.router, prefix="/series", tags=["Series"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://series-application.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API running"}