from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database import create_db_and_tables
from app.routers.notes import router as notes_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(title="AI Knowledge Notes API", lifespan=lifespan)
app.include_router(notes_router)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
