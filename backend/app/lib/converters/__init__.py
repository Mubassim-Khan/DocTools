from .pdf_to_docx import pdf_to_docx
from .docx_to_pdf import docx_to_pdf
from .pdf_to_pptx import pdf_to_pptx
from .md_to_pdf import md_to_pdf
from .docx_to_txt import docx_to_txt
from .generic_converter import convert

def convert_file_auto(input_path: str, output_path: str, input_ext: str, output_ext: str):
    if input_ext == "pdf" and output_ext == "docx":
        return pdf_to_docx(input_path, output_path)
    elif input_ext == "docx" and output_ext == "pdf":
        return docx_to_pdf(input_path, output_path)
    elif input_ext == "pdf" and output_ext == "pptx":
        return pdf_to_pptx(input_path, output_path)
    elif input_ext == "md" and output_ext == "pdf":
        return md_to_pdf(input_path, output_path)
    elif input_ext == "pdf" and output_ext == "pptx":
        return pdf_to_pptx(input_path, output_path)
    elif input_ext == "docx" and output_ext == "txt":
        return docx_to_txt(input_path, output_path)
    else:
        return convert(input_path, output_path, output_ext)
