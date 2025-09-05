import markdown
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4

def md_to_pdf(input_path: str, output_path: str) -> str:
    with open(input_path, "r", encoding="utf-8") as f:
        md_text = f.read()

    html_text = markdown.markdown(md_text)  # convert to HTML
    text = html_text.replace("<p>", "").replace("</p>", "\n")  # very simple strip

    c = canvas.Canvas(output_path, pagesize=A4)
    y = 800
    for line in text.splitlines():
        c.drawString(50, y, line)
        y -= 20
        if y < 50:
            c.showPage()
            y = 800
    c.save()
    return output_path
