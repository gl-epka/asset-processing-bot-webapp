import logging
from contextlib import asynccontextmanager

from aiogram.types import Update

from app.bot.create_bot import dp, bot, start_bot, stop_bot
from app.bot.handlers.start_router import start_router
from app.config import settings
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)


@asynccontextmanager
async def lifespan(app: FastAPI):  # pyright: ignore[reportUnusedParameter]
    logging.info("Starting bot...")
    _ = dp.include_router(start_router)
    await start_bot()
    webhook_url = settings.get_webhook_url()
    _ = await bot.set_webhook(
        url=webhook_url,
        allowed_updates=dp.resolve_used_update_types(),
        drop_pending_updates=True,
    )
    logging.info(f"Webhook set to {webhook_url}")
    yield
    logging.info("Shutting down bot...")
    _ = await bot.delete_webhook()
    await stop_bot()
    logging.info("Webhook deleted")
    await stop_bot()


app = FastAPI(lifespan=lifespan)
app.mount("/static", StaticFiles(directory="app/static"), "static")


@app.post("/webhook")
async def webhook(request: Request) -> None:
    logging.info("Received webhook request")
    update = Update.model_validate(await request.json(), context={"bot": bot})
    await dp.feed_update(bot, update)
    logging.info("Update processed")
