from fastapi import FastAPI
from app.routes import directors, series

app = FastAPI(title="TV Series API")

app.include_router(directors.router, prefix="/directors", tags=["Directors"])
app.include_router(series.router, prefix="/series", tags=["Series"])


@app.get("/")
def root():
    return {"message": "API running"}