import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        username,
        password,
      });
      if (response.data.message === 'Logged in successfully') {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('role', response.data.role);
        toast.success('Login successful!');
        navigate(`/${response.data.role.toLowerCase()}`);
      } else {
        localStorage.setItem('isLoggedIn', false);
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Error occurred');
      } else {
        toast.error('Something went wrong, try again later');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-[#070707] rounded-lg shadow-2xl p-8">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="Username" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-[#2c2c2c] text-white rounded-md outline-none border border-white focus:ring-2 focus:ring-white placeholder-gray-300"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-50 mb-2">
              Password
            </label>
            <input
              type="password"
              id="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#2c2c2c] text-white rounded-md outline-none border border-white focus:ring-2 focus:ring-white placeholder-gray-300"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-white font-bold text-black rounded-md hover:bg-[#e2e2e2] transition-all shadow-md"
          >
            Login
          </button>
        </form>
        <Toaster className='toaster' richColors position='top-center' />
      </div>
    </div>
  );
};

export default Login;
