# ChapterRewind 

**ChapterRewind** is a reading companion web app for fantasy and fiction lovers. It helps users recap previous books in a series using AI-generated summaries, curated YouTube video explanations, and personalised notes — so you can jump back into the next book without rereading everything.

##  Live Demo

🔗 [Visit the deployed app](https://chapterrewind.onrender.com/)  

---

## Features

- **Search any book** by title and author.
- **AI-powered summary** using OpenAI.
- **Video carousel** of YouTube recaps.
- **Personalized library** to save books you've read.
- **Write and edit personal notes** for each saved book.
- **Fallback covers** generated with placeholder titles.
- **Authentication** (signup/login/logout) for user-specific libraries.

---

## Tech Stack

### Frontend
- **React** with Vite
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Zustand** (state management)
- **React Router**
- **Axios** (centralized API handler)

### Backend
- **Node.js + Express**
- **MongoDB** (via Mongoose)
- **OpenAI API** (summaries)
- **Google Books API** (metadata)
- **YouTube Data API** (recap videos)
- ** Fetches book covers using the bookcover-api (https://github.com/w3slley/bookcover-api).
- **JWT Authentication**

---

## Deployment

Deployed via **Render.com** with the following setup:

### Build and Start Scripts (root `package.json`)
```json
"scripts": {
  "build": "npm install --prefix backend && npm install --prefix frontend && npm run build --prefix frontend",
  "start": "npm run start --prefix backend"
}
```
--- 

## Testing

- Vitest + React Testing Library for frontend components and Zustand stores
- Vitest for backend unit tests (controllers, middleware, utils)

--- 

## Future Enhancements

- Optimise application for mobile

---

## Author 

Noor Abid
