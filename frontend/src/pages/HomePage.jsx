import React, { useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [formData, setFormData] = useState({ title: "", author: "" });
  const [summary, setSummary] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const [summaryRes, videoRes] = await Promise.all([
        axios.post("http://localhost:3000/api/books/openai-summary", formData),
        axios.post("http://localhost:3000/api/books/youtube-recaps", formData),
      ]);

      setSummary(summaryRes.data.summary);
      setVideos(videoRes.data.data);
    } catch (error) {
      console.log("Error fetching data", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <header>
        <h2>ChapterRewind</h2>
      </header>

      <div>
        <form onSubmit={handleSearch}>
          <label htmlFor="book-title">Book Title</label>
          <input
            type="text"
            placeholder="Book Title"
            id="book-title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="book-author">Book Author</label>
          <input
            type="text"
            placeholder="Book Author"
            id="book-author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          <button>{loading ? "Loading..." : "Get Recap"}</button>
        </form>

        {summary && (
          <div>
            <h2>Book summary</h2>
            <p>{summary}</p>
          </div>
        )}

        {videos.length > 0 && (
          <div>
            <h2>Youtube Recaps</h2>
            <ul>
              {videos.map((video) => (
                <div key={video.id.videoId}>
                  <h4>{video.snippet.title}</h4>
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                    title={video.snippet.title}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
