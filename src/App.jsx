// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import RegisterBusiness from './pages/RegisterBusiness';

function App() {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mapa" element={<MapPage />} />
        <Route path="/registrar-negocio" element={<RegisterBusiness />} />
      </Routes>
    </Router>
    );
  }

export default App;
  