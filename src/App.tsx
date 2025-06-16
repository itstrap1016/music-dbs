import { BrowserRouter, Routes, Route } from "react-router-dom";
import DarkModeBtn from "./components/DarkModeBtn";
import Home from "./pages/Home/Index";
import SearchResult from "./pages/SearchResult/Index";
import TrackDetail from "./pages/TrackDetail";
function App() {
  return (
    <BrowserRouter>
      <DarkModeBtn />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/track/:artist/:track" element={<TrackDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
