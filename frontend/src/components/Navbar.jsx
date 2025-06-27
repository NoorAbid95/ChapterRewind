import BookshelfIcon from "../assets/bookshelf-nav.svg?react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ fadeNavItems }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBookshelfClick = () => {
    if (location.pathname === "/") {
      const scrollContainer = document.getElementById("scroll-container");
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 px-14 py-4 mt-4 flex items-center justify-between w-full h-16">
      <div className="z-50">
        <button
          onClick={handleBookshelfClick}
          className="cursor-pointer pointer-events-auto"
        >
          <BookshelfIcon className="h-13 w-13 stroke-white stroke-[2] hover:opacity-80 transition" />
        </button>
      </div>

      <div
        className={`transition-opacity duration-500 ease-in-out ${
          fadeNavItems
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        <ul className="flex space-x-7 text-white text-shadow-sm text-sm font-bold">
          <li>OUR STORY</li>
          <li>LOGIN</li>
          <li>SIGNUP</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
