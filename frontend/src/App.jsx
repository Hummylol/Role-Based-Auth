import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/E-commerce/owner/Dashboard';
import Products from './components/E-commerce/Products';
import AddProducts from './components/E-commerce/AddProducts';
import AuthWrapper from './components/AuthWrapper';

const App = () => {
  return (  
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='owner'
          element={
            <AuthWrapper role="Owner">
              <Dashboard />
            </AuthWrapper>
          }
        />
        <Route
          path='user'
          element={
            <AuthWrapper role="User">
              <Products />
            </AuthWrapper>
          }
        />
        <Route
          path='manager'
          element={
            <AuthWrapper role="Manager">
              <AddProducts />
            </AuthWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;