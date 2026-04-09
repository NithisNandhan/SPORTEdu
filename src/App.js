import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Interact from "./components/Interact";
import "./style.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interact" element={<Interact />} />
      </Routes>
    </Router>
  );
}

export default App;