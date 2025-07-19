import BookshelfIcon from "../../assets/bookshelf-nav.svg?react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore.js";
import axios from "axios";

const Navbar = ({ fadeNavItems }) => {
  const { user, clearUser } = useAuthStore();

  const location = useLocation();
  const navigate = useNavigate();
  const isOurStory = location.pathname === "/ourStory";
  const isLogin = location.pathname === "/login";
  const isSignup = location.pathname === "/signup";
  const isMyLibrary = location.pathname == "/mylibrary";

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

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      clearUser();
      navigate("/");
    } catch (error) {
      console.log("Logout failed", error.message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 px-14 py-4 mt-4 flex items-center justify-between w-full h-16">
      <div className="z-50">
        <button
          onClick={handleBookshelfClick}
          className="cursor-pointer pointer-events-auto"
        >
          <BookshelfIcon
            className={`h-13 w-13 stroke-[2] hover:opacity-80 transition ${
              isOurStory ? "text-black" : "stroke-white"
            }`}
          />
        </button>
      </div>

      <div
        className={`transition-opacity duration-500 ease-in-out ${
          fadeNavItems
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        }`}
      >
        <ul
          className={`flex space-x-7 text-white text-shadow-sm text-sm font-bold transition-all duration-300 ease-in-out ${
            user ? " translate-y-0" : "-translate-y-2 "
          }`}
        >
          {!isOurStory && (
            <Link to={"/ourStory"}>
              <li>OUR STORY</li>
            </Link>
          )}
          {!user && (
            <>
              {!isLogin && (
                <li>
                  <Link to={"/login"}>LOGIN</Link>
                </li>
              )}
              {!isSignup && (
                <li>
                  {" "}
                  <Link to={"/signup"}>SIGNUP</Link>
                </li>
              )}
            </>
          )}
          {user && (
            <>
              {!isMyLibrary && <Link to={"/mylibrary"}>MY LIBRARY</Link>}

              <li>
                <button className="cursor-pointer" onClick={handleLogout}>
                  LOGOUT
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
