import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import fantasyLandscape from "../assets/backgrounds/hero2-fantasy-landscape.png";
import readerSubject from "../assets/backgrounds/hero2-subject.png";

const HeroSectionTwo = () => {
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


  const handleImageError = (e) => {
    console.error("Image failed to load:", e.target.src);
  };

  return (
    <div
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex flex-items justify-center bg-no-repeat bg-contain"
    >
      <motion.div
        key={`hero2-bg-${animationKey}`} 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${fantasyLandscape})`,
          backgroundColor: "#f3f4f6", // fallback color
        }}
        initial={{ scale: 1.1 }}
        animate={isVisible ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 10 }}
      />

      <motion.img
        key={`hero2-subject-${animationKey}`} 
        src={readerSubject}
        alt="Reader"
        className="absolute bottom-0 h left-1/4 transform -translate-x-1/2 w-1/3 z-10"
        initial={{ scale: 1 }}
        animate={isVisible ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 10 }}
        onError={handleImageError}
        onLoad={() => console.log("Reader image loaded successfully")}
      />
    </div>
  );
};

export default HeroSectionTwo;
