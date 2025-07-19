import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Shared/Navbar";
import SearchPage from "./pages/SearchPage";
import { useState, useEffect } from "react";
import OurStoryPage from "./pages/OurStoryPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MyLibraryPage from "./pages/MyLibraryPage";
import useAuthStore from "./store/useAuthStore";
import { ToastContainer } from "react-toastify";

function App() {
  const [fadeNavItems, setFadeNavItems] = useState(false);
  const { setUser, clearUser, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/auth/check", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        clearUser();
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);
  return (
    <>
      <Navbar fadeNavItems={fadeNavItems} />
      <Routes>
        <Route
          path="/"
          element={<HomePage setFadeNavItems={setFadeNavItems} />}
        />
        <Route
          path="/search"
          element={<SearchPage setFadeNavItems={setFadeNavItems} />}
        />
        <Route path="/ourStory" element={<OurStoryPage />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mylibrary" element={<MyLibraryPage />} />
      </Routes>
      <ToastContainer position="bottom-center" autoClose={4000} />
    </>
  );
}

export default App;
