from fastapi import FastAPI, UploadFile, Form
from services.ocr_service import extract_text_from_image, extract_text_from_pdf
from services.gpt_service import analyze_text_with_gpt41
import os

app = FastAPI()

@app.post("/analyze")
async def analyze_doc(file: UploadFile, query: str = Form("Summarize this document.")):
    file_path = os.path.join("uploads", file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    if file.filename.lower().endswith((".png", ".jpg", ".jpeg")):
        text = extract_text_from_image(file_path)
    elif file.filename.lower().endswith(".pdf"):
        text = extract_text_from_pdf(file_path)
    else:
        return {"error": "Unsupported file type"}

    answer = analyze_text_with_gpt41(text, user_query=query)
    return {"result": answer}
