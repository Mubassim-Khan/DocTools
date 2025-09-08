from fpdf import FPDF
from docx import Document
import os

def docx_to_pdf(input_path: str, output_path: str) -> str:
    doc = Document(input_path)

    pdf = FPDF(format="A4")
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    # Load Unicode font (put DejaVuSans.ttf in fonts/)
    font_path = os.path.join(os.path.dirname(__file__), "fonts", "DejaVuSans.ttf")
    if not os.path.exists(font_path):
        raise FileNotFoundError("Missing DejaVuSans.ttf in fonts/ folder")
    pdf.add_font("DejaVu", "", font_path, uni=True)
    pdf.add_font("DejaVu", "B", font_path, uni=True)
    pdf.set_font("DejaVu", size=12)

    usable_width = pdf.w - 2 * pdf.l_margin  # dynamic width

    for para in doc.paragraphs:
        text = para.text.strip()
        if not text:
            pdf.ln(5)
            continue

        # Basic style handling
        if para.style.name.startswith("Heading"):
            pdf.set_font("DejaVu", "B", 14)
        else:
            pdf.set_font("DejaVu", "", 12)

        # Let multi_cell itself handle wrapping (no manual textwrap)
        pdf.multi_cell(usable_width, 8, txt=text, align="L")
        pdf.ln(2)

    pdf.output(output_path)
    return output_path
