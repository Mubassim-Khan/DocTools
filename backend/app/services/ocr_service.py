import os
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential

from services.utils import encode_image_to_base64
from PyPDF2 import PdfReader

# GitHub Models endpoint + models
ENDPOINT = "https://models.github.ai/inference"
MODEL_OCR = "openai/gpt-4o-mini"  # OCR model
TOKEN = os.environ["GITHUB_TOKEN_GPT_4o"]

# Init client once
client = ChatCompletionsClient(
    endpoint=ENDPOINT,
    credential=AzureKeyCredential(TOKEN),
)

def extract_text_from_image(file_path: str) -> str:
    """
    Use GPT-4o-mini for OCR on images (jpg/png).
    """
    base64_img = encode_image_to_base64(file_path)

    response = client.complete(
        model=MODEL_OCR,
        messages=[
            SystemMessage("You are an OCR assistant. Extract all visible text."),
            UserMessage(
                f"data:image/jpeg;base64,{base64_img}"
            )
        ]
    )

    return response.choices[0].message.content.strip()

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract plain text from a PDF using PyPDF2.
    """
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text.strip()
