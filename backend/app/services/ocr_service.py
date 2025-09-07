import os
from PyPDF2 import PdfReader
from dotenv import load_dotenv
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import UserMessage, SystemMessage
from azure.core.credentials import AzureKeyCredential

load_dotenv()

# GitHub Models endpoint + models
ENDPOINT = "https://models.github.ai/inference"
MODEL_OCR = "openai/gpt-4o"  # OCR model

TOKEN = os.getenv("GITHUB_TOKEN_GPT_4o")

# Init client once
client = ChatCompletionsClient(
    endpoint=ENDPOINT,
    credential=AzureKeyCredential(TOKEN),
)

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text from PDF.
    - Try PyPDF2 first.
    - If empty → fall back to GPT-4o OCR.
    """
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""

    text = text.strip()

    # If no text found → scanned PDF → use GPT-4o OCR
    if not text:
        with open(file_path, "rb") as f:
            pdf_bytes = f.read()

        response = client.complete(
            model=MODEL_OCR,
            messages=[
                SystemMessage("You are an OCR assistant. Extract all readable text from this PDF."),
                UserMessage(content=pdf_bytes, role="user", name="file", mime_type="application/pdf")
            ],
        )

        text = response.choices[0].message.content.strip()

    return text