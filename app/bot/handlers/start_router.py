from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.types import MenuButtonWebApp, Message, WebAppInfo

from app.config import settings

start_router = Router()


@start_router.message(CommandStart)
async def command_start_handler(message: Message) -> None:
    """
    This handler receives messages with `/start` command
    """
    _ = await message.bot.set_chat_menu_button(  # pyright: ignore[reportOptionalMemberAccess]
        chat_id=message.chat.id,
        menu_button=MenuButtonWebApp(
            text="MyShCh", web_app=WebAppInfo(url=settings.WEBAPP_ENDPOINT)
        ),
    )
