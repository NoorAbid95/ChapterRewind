import { motion } from "framer-motion";
import MyLibraryBg from "../../assets/backgrounds/myLibrary_bg.jpg";

const MyLibraryHero = () => {
  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${MyLibraryBg})`,
          backgroundColor: "#f3f4f6", // fallback color
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
    </div>
  );
};

export default MyLibraryHero;
