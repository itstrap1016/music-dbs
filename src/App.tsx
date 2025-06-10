import { BrowserRouter, Routes, Route } from "react-router-dom";
import DarkModeBtn from "./components/DarkModeBtn";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";

function App() {
  return (
    <BrowserRouter>
      <DarkModeBtn />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
