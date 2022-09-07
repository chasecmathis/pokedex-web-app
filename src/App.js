import React from 'react';
import {HashRouter as Router, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './Components/layout/nav/NavBar';
import Dashboard from './Components/layout/Dashboard';
import Pokemon from './Components/pokemon/Pokemon';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route exact path={"/pokemon/:pokemonIndex"} element={<Pokemon />} />
          </Routes>
        </div>
      </div>
    </Router >
  );
}

export default App;