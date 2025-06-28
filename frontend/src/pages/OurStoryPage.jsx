import { useNavigate, Link } from "react-router-dom";
import OurStoryHero from "../components/OurStoryHero";
import castleHome from "../assets/castle-home.svg";
import { motion } from "framer-motion";

const OurStoryPage = () => {
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/");
      setTimeout(() => {
        setSummary("");
        setVideos([]);
        setFormData({ title: "", author: "" });
      }, 100);
    }, 300);
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <OurStoryHero />
      </div>

      <div
        id="main"
        className="relative z-10 flex items-center justify-center min-h-screen pt-16 py-10 sm:px-10 md:px-14"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="w-full max-w-3xl bg-[#DECDAE]/40 rounded-3xl p-8 backdrop-blur-sm"
        >
          <div className="max-w-2xl  mx-auto text-center space-y-6 text-shadow-gray-500  md:text-base leading-relaxed">
            <h3 id="brand-header">The Story of ChapterRewind</h3>
            <p className="mt-6">
              <span className=" font-medium">ChapterRewind</span> was born from
              a reader’s dilemma: you pick up an epic book series, fall in love
              with its world & characters, but life or the publishing cycle (or
              just a really long reading break...) gets in the way. Months or
              even years pass, and when the next book finally arrives, that
              once-vivid world feels distant and unfamiliar.
            </p>
            <p>
              When you finally return, you're lost. Names, plots, politics,
              magic systems are all a blur.
            </p>
            <p>
              This space was built for readers like us. A place to{" "}
              <span className="italic">refresh your memory</span>,{" "}
              <span className="italic">reconnect with characters</span>, and{" "}
              <span className="italic">rewind the story</span> before diving
              back in. Whether it's a quick recap or a deep re-immersion,{" "}
              <span className="font-medium">ChapterRewind</span> helps you pick
              up right where you left off—without starting from page one again.
            </p>

            <button onClick={handleHomeClick} className="mt-6 p-4  ">
              <img
                src={castleHome}
                alt="Home button"
                title="Homepage"
                className="w-10 h-10 mx-auto opacity-80 hover:opacity-70 hover:scale-103 active:scale-97 transition  cursor-pointer  "
              />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurStoryPage;
