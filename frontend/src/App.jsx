import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import SearchPage from "./pages/SearchPage";
import { useState } from "react";
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
      </Routes>
    </>
  );
}

export default App;
