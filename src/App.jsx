import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import BrandbookGate from './components/BrandbookGate.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brandbook" element={<BrandbookGate />} />
      </Routes>
    </BrowserRouter>
  );
}
