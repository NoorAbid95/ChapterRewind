import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { useSummary } from "../context/SummaryCotext";
import { motion } from "framer-motion";
import LoadingAnimation from "../components/LoadingAnimation";
import HeroSectionOne from "../components/HomeHeroSectionOne";
import HeroSectionTwo from "../components/HomeHeroSectionTwo";

const HomePage = () => {
  const navigate = useNavigate();

  const { summary, setSummary, videos, setVideos, formData, setFormData } =
    useSummary();

  const [loading, setLoading] = useState(false);

  const [animationKey, setAnimationKey] = useState(0);
  const containerRef = useRef(null);

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

      navigate("/search");
    } catch (error) {
      console.log("Error fetching data", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setAnimationKey((prev) => prev + 1);
        }
      },
      {
        threshold: 0.5,
      }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <HeroSectionOne />
      <div
        id="separator"
        className="h-[10px] bg-[#585059]/70 flex justify-center items-center z-50"
      />
      <div className="snap-start h-screen relative">
        <HeroSectionTwo />

        <div
          className="absolute inset-0 flex items-center justify-center z-30"
          style={{ transform: "rotateX(25deg)", transformStyle: "preserve-3d" }}
          ref={containerRef}
        >
          <motion.div
            key={animationKey}
            className="w-[470px] h-[100px] flex items-center justify-evenly gap-4 
               px-6 py-4 rounded-full bg-gradient-to-r from-[#5d5d5d]/40 to-[#bebebe]/40 
               shadow-md shadow-[#FAF4E7]/50
               transition-all duration-700 backdrop-blur-md"
            initial={{
              scale: 1,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.1,
              ease: "easeOut",
            }}
          >
            <form onSubmit={handleSearch} className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="bg-transparent placeholder-white text-white border-b border-white/40 
                   focus:outline-none text-md w-[140px] "
              />
              <input
                type="text"
                placeholder="Author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="bg-transparent placeholder-white text-white border-b border-white/40
                   focus:outline-none text-md w-[140px] "
              />
              <div className="flex items-center justify-center h-[40px]">
                <button
                  type="submit"
                  className="p-0 border-none focus:outline-none rounded-full bg-[#FEFEE7]/40 
                     hover:bg-[#D4C7C7]/40 cursor-pointer"
                >
                  <LoadingAnimation playing={loading} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
