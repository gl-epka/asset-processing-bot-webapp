from pathlib import Path

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(  # pyright: ignore[reportUnannotatedClassAttribute]
        env_file=Path(__file__).resolve().parent.parent / ".env"
    )
    WEBAPP_ENDPOINT: str = Field(alias="WEBAPP_ENDPOINT")
    BOT_TOKEN: str = Field(alias="BOT_TOKEN")

    def get_webhook_url(self) -> str:
        return f"{self.WEBAPP_ENDPOINT}/webhook"


settings = Settings()  # pyright: ignore[reportCallIssue]
