import os
from dotenv import load_dotenv
from azure.ai.inference import ChatCompletionsClient
from azure.ai.inference.models import SystemMessage, UserMessage
from azure.core.credentials import AzureKeyCredential

load_dotenv()

# GitHub Models endpoint + model
ENDPOINT = "https://models.github.ai/inference"
MODEL = "openai/gpt-4.1"

# Load token securely from env
TOKEN = os.getenv("GITHUB_TOKEN_GPT_4_1")

# Init client once
client = ChatCompletionsClient(
    endpoint=ENDPOINT,
    credential=AzureKeyCredential(TOKEN),
)

def analyze_text_with_gpt41(text: str, user_query: str) -> str:
    """
    Send extracted text to GPT-4.1 (GitHub Models) for reasoning: summary/Q&A.
    """
    response = client.complete(
         messages=[
            SystemMessage("You are a text summarizer. Your job is to create a brief, clear, and concise summary of the provided document."),
            UserMessage(f"Document:\n{text}\n\nUser request: {user_query}")
        ],
        temperature=0.7,
        top_p=1.0,
        model=MODEL
    )
    
    return response.choices[0].message.content.strip()
