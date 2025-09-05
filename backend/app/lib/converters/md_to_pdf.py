# app/lib/converters/md_to_pdf.py
import markdown
from weasyprint import HTML

def md_to_pdf(input_path: str, output_path: str) -> str:
    with open(input_path, "r", encoding="utf-8") as f:
        md_text = f.read()

    # Convert Markdown → HTML
    html_text = markdown.markdown(md_text, extensions=["fenced_code", "tables"])

    # Wrap in minimal HTML for proper rendering
    full_html = f"""
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: Arial, sans-serif; margin: 2rem; }}
            h1, h2, h3, h4, h5, h6 {{ font-weight: bold; }}
            code {{ background: #f4f4f4; padding: 2px 4px; border-radius: 4px; }}
            pre {{ background: #f4f4f4; padding: 10px; border-radius: 6px; overflow-x: auto; }}
            table {{ border-collapse: collapse; width: 100%; margin: 1rem 0; }}
            th, td {{ border: 1px solid #ccc; padding: 8px; text-align: left; }}
            a {{ color: #0366d6; text-decoration: none; }}
        </style>
    </head>
    <body>
        {html_text}
    </body>
    </html>
    """

    # Render to PDF
    HTML(string=full_html).write_pdf(output_path)
    return output_path
