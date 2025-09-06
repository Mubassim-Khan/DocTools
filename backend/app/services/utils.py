import base64
import os

def encode_image_to_base64(file_path: str) -> str:
    """Read an image and return base64 string for LLM input."""
    with open(file_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

def save_uploaded_file(file, upload_dir="temp") -> str:
    """Save an uploaded file locally and return its path."""
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    with open(file_path, "wb") as f:
        f.write(file.file.read())
    return file_path
