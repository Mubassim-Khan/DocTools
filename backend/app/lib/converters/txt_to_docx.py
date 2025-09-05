from docx import Document

def txt_to_docx(input_path: str, output_path: str) -> str:
    # Read plain text
    with open(input_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    # Create new Word document
    doc = Document()
    for line in lines:
        doc.add_paragraph(line.strip())

    # Save DOCX
    doc.save(output_path)
    return output_path
