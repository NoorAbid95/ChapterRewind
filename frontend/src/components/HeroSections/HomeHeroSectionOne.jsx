import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import skyBg from "../../assets/backgrounds/hero1-fantasy-sky.jpg";

const HeroSectionOne = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setIsVisible(true);
          setAnimationKey((prev) => prev + 1); // Force re-render to restart animations
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Add error handling for images
  const handleImageError = (e) => {
    console.error("Image failed to load:", e.target.src);
  };

  return (
    <div
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex flex-items justify-center bg-no-repeat bg-contain"
    >
      <motion.div
        key={`hero1-bg-${animationKey}`}
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${skyBg})`,
          backgroundColor: "#f3f4f6", // fallback color
        }}
        initial={{ backgroundPositionY: "80%" }}
        animate={{ backgroundPositionY: isVisible ? "100%" : "80%" }}
        transition={{ duration: 1, ease: "linear" }}
      >
        <motion.h1
          id="brand-header"
          className="flex justify-center items-center mt-[40vh] text-shadow-lg text-white text-5xl md:text-6xl lg:text-8xl font-extrabold"
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? "0%" : "100%" }}
          transition={{ duration: 1 }}
        >
          ChapterRewind
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default HeroSectionOne;
