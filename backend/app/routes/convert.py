from fastapi import APIRouter, UploadFile, Form
from fastapi.responses import FileResponse
import pypandoc
import os
import uuid

router = APIRouter(prefix="/convert", tags=["Conversion"])

@router.post("")
async def convert_file(file: UploadFile, output_format: str = Form(...)): 
    # Save temp file
    input_path = f"temp_{uuid.uuid4()}_{file.filename}"
    with open(input_path, "wb") as f:
        f.write(await file.read()) 

    output_path = f"converted_{uuid.uuid4()}.{output_format}"
    print(f"Converting {input_path} → {output_path} as {output_format}")
    
    pypandoc.convert_file(input_path, output_format, outputfile=output_path)
    return FileResponse(output_path, filename=f"converted.{output_format}", background=None)