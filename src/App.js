import AddHero from "./components/AddHero";
import Edit from "./components/Edit";
import ShowHero from "./components/ShowHero";
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<ShowHero />} />
          <Route path="/add" element={<AddHero />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
