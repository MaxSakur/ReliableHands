import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components';

import {Home} from './pages/home';
import {Services} from './pages/services';
import {About} from './pages/about';
import BackgroundVideo from 'components/backgroundVideo';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <BackgroundVideo>
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BackgroundVideo>
      </div>
    </Router>
  );
}

export default App;