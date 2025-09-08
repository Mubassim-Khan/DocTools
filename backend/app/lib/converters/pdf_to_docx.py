from PyPDF2 import PdfReader
from docx import Document

def pdf_to_docx(input_path: str, output_path: str) -> str:
    reader = PdfReader(input_path)
    doc = Document()

    for page in reader.pages:
        text = page.extract_text()
        if text:
            doc.add_paragraph(text)

    doc.save(output_path)
    return output_path
