# app/lib/converters/md_to_pdf.py
from fpdf import FPDF
import markdown
from bs4 import BeautifulSoup
import os

def md_to_pdf(input_path: str, output_path: str) -> str:
    with open(input_path, "r", encoding="utf-8") as f:
        md_text = f.read()

    html = markdown.markdown(md_text)
    soup = BeautifulSoup(html, "html.parser")

    pdf = FPDF(format="A4")
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    font_path = os.path.join(os.path.dirname(__file__), "fonts", "DejaVuSans.ttf")
    if not os.path.exists(font_path):
        raise FileNotFoundError("Missing DejaVuSans.ttf in fonts/ folder")
    pdf.add_font("DejaVu", "", font_path, uni=True)
    pdf.add_font("DejaVu", "B", font_path, uni=True)
    pdf.set_font("DejaVu", size=12)

    usable_width = 50
    print(usable_width)

    for elem in soup.children:
        text = elem.get_text(strip=True)
        if not text:
            continue

        if elem.name in ["h1", "h2", "h3"]:
            pdf.set_font("DejaVu", "B", 14)
            pdf.multi_cell(usable_width, 10, text, align="L")
            pdf.ln(2)
        elif elem.name == "p":
            pdf.set_font("DejaVu", "", 12)
            pdf.multi_cell(usable_width, 8, text, align="L")
            pdf.ln(2)
        elif elem.name == "ul":
            for li in elem.find_all("li"):
                pdf.set_font("DejaVu", "", 12)
                pdf.multi_cell(usable_width, 8, f"• {li.get_text(strip=True)}", align="L")
        elif elem.name == "code" or elem.name == "pre":
            pdf.set_font("DejaVu", "", 11)  # or add Courier
            pdf.set_text_color(200, 50, 50)  # reddish for code
            pdf.multi_cell(usable_width, 8, text, align="L")
            pdf.set_text_color(0, 0, 0)  # reset
        elif elem.name == "strong" or elem.name == "b":
            pdf.set_font("DejaVu", "B", 12)
            pdf.multi_cell(usable_width, 8, text, align="L")
        else:
            pdf.set_font("DejaVu", "", 12)
            pdf.multi_cell(usable_width, 8, text, align="L")

    pdf.output(output_path)
    return output_path
