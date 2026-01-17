from backend.core.models import ServiceQuestion

SERVICE_INTRO = (
    "옥상이몽은 옥상 녹화의 효과를 시뮬레이션하고, 건물 정보를 기반으로 "
    "도입 타당성을 빠르게 파악할 수 있도록 돕는 서비스입니다."
)


def build_service_intro_response(message: str) -> str:
    question = ServiceQuestion(message=message)
    if not question.message.strip():
        return "궁금한 내용을 입력해 주세요."
    return SERVICE_INTRO
