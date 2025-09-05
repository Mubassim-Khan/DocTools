from pdf2docx import Converter

def pdf_to_docx(input_path: str, output_path: str) -> str:
    cv = Converter(input_path)
    cv.convert(output_path, start=0, end=None)  # convert all pages
    cv.close()
    return output_path
