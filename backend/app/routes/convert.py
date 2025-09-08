from fastapi import APIRouter, UploadFile, Form
from fastapi.responses import FileResponse
import os, uuid

from app.lib.converters import convert_file_auto

router = APIRouter(prefix="/convert", tags=["Conversion"])

@router.post("")
async def convert_file(file: UploadFile, output_format: str = Form(...)):
    try:
        temp_dir = "/tmp"
        os.makedirs(temp_dir, exist_ok=True)

        input_path = os.path.join(temp_dir, f"src_{uuid.uuid4()}_{file.filename}")
        with open(input_path, "wb") as f:
            f.write(await file.read())

        output_ext = output_format.split("-")[-1]
        output_path = os.path.join(temp_dir, f"converted_{uuid.uuid4()}.{output_ext}")

        convert_file_auto(input_path, output_path, output_format)

        return FileResponse(output_path, filename=f"converted.{output_ext}")
    
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        return {"error": str(e)}, 500
