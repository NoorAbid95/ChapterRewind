import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import { useState } from "react";
import OurStoryPage from "./pages/OurStoryPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
function App() {
  const [fadeNavItems, setFadeNavItems] = useState(false);
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
      </Routes>
    </>
  );
}

export default App;
