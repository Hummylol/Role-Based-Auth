import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to the Secure Access Portal
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Your access to the future starts here. Choose your role and get started!
        </p>
        
        <div className="flex space-x-6 justify-center">
          <Link 
            to="/login" 
            className="p-3 w-32 text-center bg-white text-black font-bold rounded-md hover:bg-gray-300 transition-all shadow-lg"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="p-3 w-32 text-center bg-gray-700 text-white font-bold rounded-md hover:bg-gray-600 transition-all shadow-lg"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="absolute bottom-4 text-gray-500">
        <p>Role-Based Authentication System © 2024</p>
      </div>
    </div>
  );
};

export default Home;
