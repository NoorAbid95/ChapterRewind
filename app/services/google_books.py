import requests
from dotenv import load_dotenv
import os

def configure(): 
    load_dotenv()

google_books_ep = 'https://www.googleapis.com/books/v1/volumes?'




def get_book_info(book_title):
    configure()
    params = {
        'q': book_title,
        'key': os.getenv('GOOGLE_BOOKS_API_KEY')
    }
    response = requests.get(google_books_ep, params=params)

    data = response.json()

    if 'items' not in data:
        return "No book information found!"
    
    google_books_description = data['items'][0]['volumeInfo']['description']

    return google_books_description
