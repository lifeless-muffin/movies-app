// Dependencies
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

// Route Components
import Home from './routes/HomeRoute';
import Search from './routes/SearchRoute'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </Router>
  );
}
