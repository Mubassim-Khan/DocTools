import base64
from io import BytesIO
from PIL import Image

def encode_image_to_base64(img: Image.Image) -> str:
    """
    Encode a PIL Image object to base64 string.
    Converts RGBA images to RGB to avoid JPEG errors.
    """
    if img.mode in ("RGBA", "LA"):
        img = img.convert("RGB")  # remove alpha channel

    buffered = BytesIO()
    img.save(buffered, format="JPEG")  # now safe
    return base64.b64encode(buffered.getvalue()).decode()
