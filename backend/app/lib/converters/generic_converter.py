import pypandoc
import os

try:
    pypandoc.get_pandoc_version()
except OSError:
    pypandoc.download_pandoc()

def convert(input_path: str, output_format: str, output_path: str) -> str:
    """
    Generic converter wrapper around pypandoc.
    Converts input_path to given output_format and saves at output_path.
    """
    pypandoc.convert_file(input_path, output_format, outputfile=output_path)
    return output_path
