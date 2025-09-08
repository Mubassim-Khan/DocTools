from fastapi import APIRouter, UploadFile, Form
from app.services.ocr_service import extract_text_from_pdf
from app.services.gpt_service import analyze_text_with_gpt41
import os

router = APIRouter(prefix="/analyze", tags=["Analyze"])

@router.post("")
async def analyze_doc(file: UploadFile, query: str = Form("Summarize this document.")):
    try:
        temp_dir = "/tmp"
        os.makedirs(temp_dir, exist_ok=True)

        file_path = os.path.join(temp_dir, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())

        if file.filename.lower().endswith(".pdf"):
            text = extract_text_from_pdf(file_path)
        else:
            return {"error": "Unsupported file type"}

        answer = analyze_text_with_gpt41(text, user_query=query)
        return {"result": answer}
    
    except Exception as e:
        import traceback
        print(traceback.format_exc())  # logs in Vercel
        return {"error": str(e)}, 500
