from docx2pdf import convert as docx2pdf_convert
import os

def docx_to_pdf(input_path: str, output_path: str) -> str:
    # docx2pdf only works on Windows and macOS
    # On Linux servers, we fallback to reportlab
    if os.name in ["nt", "mac"]:
        docx2pdf_convert(input_path, output_path)
    else:
        from reportlab.pdfgen import canvas
        from docx import Document

        doc = Document(input_path)
        c = canvas.Canvas(output_path)
        y = 800
        for para in doc.paragraphs:
            c.drawString(50, y, para.text)
            y -= 20
            if y < 50:
                c.showPage()
                y = 800
        c.save()

    return output_path
