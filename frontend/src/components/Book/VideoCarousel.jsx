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
    if (index === currentIndex) return 0;
    if ((index + 1) % total === currentIndex) return -1;
    if ((index - 1 + total) % total === currentIndex) return 1;
    return null;
  };

  return (
    <>
      <div className="absolute  mt-70 inset-20 flex justify-between items-center pointer-events-none ">
        <button
          aria-label="Previous Slide"
          onClick={prevSlide}
          className="p-2 rounded-full border border-white/20 shadow-md shadow-[#5E402D] hover:shadow-lg hover:shadow-[#5E1A1D]/70 hover:scale-102 bg-black/40 text-white transition pointer-events-auto cursor-pointer  active:scale-92"
        >
          <HiOutlineArrowSmallLeft size={24} />
        </button>
        <button
          aria-label="Next Slide"
          onClick={nextSlide}
          className="p-2 rounded-full border border-white/20 shadow-md shadow-[#5E402D] hover:shadow-lg hover:shadow-[#5E1A1D]/70 hover:scale-102 bg-black/40 text-white transition pointer-events-auto cursor-pointer active:scale-92"
        >
          <HiOutlineArrowSmallRight size={24} />
        </button>
      </div>
      <div className="relative w-full max-w-3xl mx-auto">
        <div className="relative h-[220px] md:h-[320px] w-full flex items-center justify-center overflow-visible">
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

        {/* Dots */}
        <div className="flex justify-center mt-3 gap-1">
          {videos.map((_, index) => (
            <BsDot
              data-testid="dot"
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`mt-3 cursor-pointer text-2xl text-shadow ${
                index === currentIndex
                  ? "text-amber-100w scale-200"
                  : "text-gray-300 hover:scale-120"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoCarousel;
