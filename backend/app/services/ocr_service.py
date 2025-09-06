import os
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential
from PyPDF2 import PdfReader
from PIL import Image
from dotenv import load_dotenv

from app.services.utils import encode_image_to_base64

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

def split_image(image_path: str, max_width=1024, max_height=1024):
    """
    Split large image into smaller tiles to avoid token limits.
    """
    img = Image.open(image_path)
    width, height = img.size

    chunks = []
    for top in range(0, height, max_height):
        for left in range(0, width, max_width):
            box = (left, top, min(left + max_width, width), min(top + max_height, height))
            chunk = img.crop(box)
            chunks.append(chunk)
    return chunks

def extract_text_from_image(file_path: str) -> str:
    """
    Use GPT-4o for OCR on images (jpg/png), split into smaller chunks if necessary.
    """
    text_pieces = []

    # Split image into tiles
    image_chunks = split_image(file_path)

    for idx, chunk in enumerate(image_chunks):
        # Convert tile to base64
        base64_img = encode_image_to_base64(chunk)

        response = client.complete(
            model=MODEL_OCR,
            messages=[
                SystemMessage("You are an OCR assistant. Extract all visible text."),
                UserMessage(f"data:image/jpeg;base64,{base64_img}")
            ]
        )
        chunk_text = response.choices[0].message.content.strip()
        text_pieces.append(chunk_text)
    
    # Combine all extracted text
    return "\n".join(text_pieces)

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract plain text from a PDF using PyPDF2.
    """
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text.strip()
