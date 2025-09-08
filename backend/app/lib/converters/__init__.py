from .pdf_to_docx import pdf_to_docx
from .docx_to_pdf import docx_to_pdf
from .pdf_to_pptx import pdf_to_pptx
from .md_to_pdf import md_to_pdf
from .txt_to_docx import txt_to_docx
from .docx_to_txt import docx_to_txt

def convert_file_auto(input_path: str, output_path: str, output_format: str):
    format_map = {
        "pdf-to-docx": ("pdf", "docx"),
        "docx-to-pdf": ("docx", "pdf"),
        "pdf-to-pptx": ("pdf", "pptx"),
        "md-to-pdf": ("md", "pdf"),
        "docx-to-txt": ("docx", "txt"),
        "txt-to-docx": ("txt", "docx"),
    }

    if output_format not in format_map:
        raise ValueError(f"Unsupported conversion format: {output_format}")

    input_ext, output_ext = format_map[output_format]
    input_ext, output_ext = input_ext.lower(), output_ext.lower()

    if input_ext == "pdf" and output_ext == "docx":
        return pdf_to_docx(input_path, output_path)
    elif input_ext == "docx" and output_ext == "pdf":
        return docx_to_pdf(input_path, output_path)
    elif input_ext == "pdf" and output_ext == "pptx":
        return pdf_to_pptx(input_path, output_path)
    elif input_ext == "md" and output_ext == "pdf":
        return md_to_pdf(input_path, output_path)
    elif input_ext == "txt" and output_ext == "docx":
        return txt_to_docx(input_path, output_path)
    elif input_ext == "docx" and output_ext == "txt":
        return docx_to_txt(input_path, output_path)
    else:
        raise ValueError("Unsupported conversion operation")
