import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineArrowSmallLeft,
  HiOutlineArrowSmallRight,
} from "react-icons/hi2";
import { BsDot } from "react-icons/bs";

const VideoCarousel = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = videos.length;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const getPosition = (index) => {
    // Normalize position (-1, 0, 1) based on currentIndex
    if (index === currentIndex) return 0;
    if ((index + 1) % total === currentIndex) return -1;
    if ((index - 1 + total) % total === currentIndex) return 1;
    return null; // skip rendering
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative h-[220px] md:h-[320px] flex items-center justify-center overflow-visible">
        {videos.map((video, index) => {
          const position = getPosition(index);
          if (position === null) return null;

          let x = "0%";
          let scale = 1;
          let opacity = 1;
          let z = 30;
          let pointer = "auto";

          if (position === -1) {
            x = "-12%";
            scale = 0.9;
            opacity = 0.5;
            z = 20;
            pointer = "cursor-pointer";
          } else if (position === 1) {
            x = "12%";
            scale = 0.9;
            opacity = 0.5;
            z = 20;
            pointer = "cursor-pointer";
          }

          return (
            <motion.div
              key={video.id.videoId}
              className={`absolute w-[80%] h-full ${pointer}`}
              style={{ zIndex: z }}
              animate={{ x, scale, opacity }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={() => setCurrentIndex(index)}
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                title={video.snippet.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-xl shadow-xl border border-purple-300/30"
              ></iframe>
            </motion.div>
          );
        })}
      </div>

      {/* Arrows */}
      <div className="flex justify-between items-center mt-6 px-4">
        <button
          onClick={prevSlide}
          className=" p-2 rounded-full border border-white/20 shadow-md shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 hover:cursor-pointer shadow"
        >
          <HiOutlineArrowSmallLeft />
        </button>
        <button
          onClick={nextSlide}
          className=" p-2 rounded-full border border-white/20 shadow-md shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 hover:cursor-pointer"
        >
          <HiOutlineArrowSmallRight />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-3 gap-1">
        {videos.map((_, index) => (
          <BsDot
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer text-2xl ${
              index === currentIndex ? "text-gray-800" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
