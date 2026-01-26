from fastapi import APIRouter, Response
from pydantic import BaseModel

from core.models import SimulationResult
from core.services.report_service import ReportService

router = APIRouter()


class ReportRequest(BaseModel):
    result: SimulationResult


@router.post("/reports/pdf")
def build_pdf_report(request: ReportRequest) -> Response:
    service = ReportService()
    pdf_bytes, filename = service.build_pdf(request.result)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.post("/reports/excel")
def build_excel_report(request: ReportRequest) -> Response:
    service = ReportService()
    excel_bytes, filename = service.build_excel(request.result)
    return Response(
        content=excel_bytes,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
