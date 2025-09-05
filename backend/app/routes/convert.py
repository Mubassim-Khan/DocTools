from fastapi import APIRouter, UploadFile, Form
from fastapi.responses import FileResponse
import os, uuid

from app.lib.converters import convert_file_auto

router = APIRouter(prefix="/convert", tags=["Conversion"])

@router.post("")
async def convert_file(file: UploadFile, output_format: str = Form(...)):
    # Save uploaded file
    input_path = f"temp/src/temp_{uuid.uuid4()}_{file.filename}"
    with open(input_path, "wb") as f:
        f.write(await file.read())

    # Derive correct extension for output file
    # Example: "pdf-to-docx" -> "docx"
    output_ext = output_format.split("-")[-1]
    output_path = f"temp/output/converted_{uuid.uuid4()}.{output_ext}"

    # Call your auto converter (new signature)
    convert_file_auto(input_path, output_path, output_format)

    return FileResponse(output_path, filename=f"converted.{output_ext}")
