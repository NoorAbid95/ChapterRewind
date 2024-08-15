from openai import OpenAI
from dotenv import load_dotenv
import os

def configure(): 
    load_dotenv()


def ai_complete(): 
    configure()
    client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'))

    completion = client.chat.completions.create(
        model='gpt-4o-mini', 
        messages=[
            {"role": "user", "content": "Provide a book recap for Name of the wind"}
        ]
    )

    return completion