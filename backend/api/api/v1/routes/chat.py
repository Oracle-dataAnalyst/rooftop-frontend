from fastapi import APIRouter
from pydantic import BaseModel

from backend.ai.chat_orchestrator import build_service_intro_response

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("")
def chat(request: ChatRequest) -> dict:
    reply = build_service_intro_response(request.message)
    return {"reply": reply}
