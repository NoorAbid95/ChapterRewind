import os
import googleapiclient.discovery
from dotenv import load_dotenv



def configure(): 
    load_dotenv()



def get_youtube_links(book_title):
    configure()

    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

    youtube = googleapiclient.discovery.build('youtube', 'v3', developerKey=os.environ.get('YT_API_KEY'))

    request = youtube.search().list(
        part='snippet',
        maxResults=5,
        q=f'{book_title} Book Recap',
        type='video',
    )

    response = request.execute()

    videos =[]
    for item in response['items']:
        video_title = item['snippet']['title']
        video_id = item['id']['videoId']
        video_url = f"https://www.youtube.com/watch?v={video_id}"
        thumbnail_url = item['snippet']['thumbnails']['medium']['url']
        videos.append({'title': video_title, 'url':video_url, 'thumbnail': thumbnail_url})
    return videos




