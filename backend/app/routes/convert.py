from fastapi import APIRouter, UploadFile, Form
from fastapi.responses import FileResponse
import os, uuid

from app.lib.converters import convert_file_auto

router = APIRouter(prefix="/convert", tags=["Conversion"])

@router.post("")
async def convert_file(file: UploadFile, output_format: str = Form(...)):
    input_path = f"temp/src/temp_{uuid.uuid4()}_{file.filename}"
    with open(input_path, "wb") as f:
        f.write(await file.read())

    output_path = f"temp/output/converted_{uuid.uuid4()}.{output_format}"   

    input_ext = file.filename.split(".")[-1].lower()
    output_ext = output_format.lower()

    convert_file_auto(input_path, output_path, input_ext, output_ext)

    return FileResponse(output_path, filename=f"converted.{output_format}")

