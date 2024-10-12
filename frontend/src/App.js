import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StateDetail from './pages/StateDetail';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/state/:id" element={<StateDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
