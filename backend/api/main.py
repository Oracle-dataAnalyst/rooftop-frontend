from fastapi import FastAPI

from backend.api.api.v1.router import api_router


def create_app() -> FastAPI:
    app = FastAPI(title="Rooftop API")
    app.include_router(api_router, prefix="/api/v1")
    return app


app = create_app()
