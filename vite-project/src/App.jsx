import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Component/Mainpage';
import Register from './Component/Register';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>

  );
}

export default App;