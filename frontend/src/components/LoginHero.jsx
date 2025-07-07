import { motion } from "framer-motion";
import LoginBg from "../assets/backgrounds/loginPage_bg.jpeg";

const LoginHero = () => {
  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${LoginBg})`,
          backgroundColor: "#f3f4f6", // fallback color
          backgroundSize: "cover",
        }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
    </div>
  );
};

export default LoginHero;
