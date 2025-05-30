from flask import render_template, request
from app import create_app
from app.services.google_books import get_book_info
from app.services.yt_search import get_youtube_links

app = create_app()



@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        book_title = request.form['book_title']
        book_info = get_book_info(book_title)
        youtube_links = get_youtube_links(book_title)
        return render_template('index.html', book_info=book_info, youtube_links=youtube_links)
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)