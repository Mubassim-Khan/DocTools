from pptx import Presentation
from pdf2docx import Converter

def pdf_to_pptx(input_path: str, output_path: str) -> str:
    prs = Presentation()
    cv = Converter(input_path)
    tmp_docx = "temp_from_pdf.docx"
    cv.convert(tmp_docx, start=0, end=None)
    cv.close()

    from docx import Document
    doc = Document(tmp_docx)

    for para in doc.paragraphs:
        slide = prs.slides.add_slide(prs.slide_layouts[1])
        textbox = slide.shapes.placeholders[1]
        textbox.text = para.text

    prs.save(output_path)
    return output_path
