import React from 'react';
import './App.css';
import './Moviechart/Moviechart.css';
import MovieChart from './Moviechart/Moviechart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Booking from '../src/Movieboard-app/Booking';  // Booking 컴포넌트 임포트

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1 className='movieline'>무비차트</h1>
        
        <Routes>
          <Route path="/" element={<MovieChart />} />
          <Route path="/Movieboard-app" element={<Booking />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;