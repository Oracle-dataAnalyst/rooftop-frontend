from pydantic import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Rooftop API"


settings = Settings()
