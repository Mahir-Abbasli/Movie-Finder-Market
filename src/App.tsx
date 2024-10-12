import React from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Favorites from './components/Favorites';
import Orders from './components/Orders';
import SearchResults from './components/SearchResults';
import SignIn from './components/SignIn';
import Register from './components/Register';

function App() {
  return (
    <div className="App flex flex-col h-screen">
      <Router>
        <Header />

        {/* Responsive Container for Routes */}
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="flex-1 bg-gray-200 p-4">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/register" element={<Register />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
