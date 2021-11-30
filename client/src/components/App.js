import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";

import Home from "../pages/Home";
import Register from "../pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
