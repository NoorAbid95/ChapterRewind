# ChapterRewind 
A reading companion web app designed for book lovers who need a quick refresher before diving back into a story. 
Whether you've taken a break between books in the series or just want a quick summary before the sequel drops, ChapterRewind helps you catch up with AI-powered summaries and video recaps — all in one place.

---

## Features (Current)

- **Book Recap Search**
  - Fetches AI-generated synopses using the OpenAI API
  - Retrieves relevant YouTube video recaps with YouTube Data API

- **Tech Stack**
  - **Frontend:** React + Tailwind CSS
  - **Backend:** Node.js + Express
  - **HTTP Requests:** Axios
  - **Data:** OpenAI & YouTube APIs

---

## In Progress: User Authentication

- User **signup/login** via email & password
- JWT-based auth with secure HTTP-only cookies
- Auth routes protected via middleware
- MongoDB via Mongoose for storing user data

---

## Planned Features (Coming Soon)

- **My Library**
  - Logged-in users can save books they’ve searched
  - Book covers fetched from the Google Books API
  - Users can add and save personal notes for each title

---

## Installation

# Clone the repo
git clone https://github.com/yourusername/chapterrewind.git
cd chapterrewind

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

--- 
## Author 
Noor Abid
