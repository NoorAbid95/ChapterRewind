import { motion } from "framer-motion";
import openBook from "../../assets/backgrounds/open_book.jpg";

const OurStoryHero = () => {
  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${openBook})`,
          backgroundColor: "#f3f4f6", // fallback color
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
    </div>
  );
};

export default OurStoryHero;
