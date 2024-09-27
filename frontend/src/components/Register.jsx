import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        username,
        password,
        role,
      });

      if (response.data.message === 'User created successfully') {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('role', response.data.user.role);
        toast.success('Registered Successfully')
      } else {
        toast.error(response.data.message || "Error while registering")
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-[#070707] rounded-lg shadow-2xl p-8">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 bg-[#2c2c2c] text-white rounded-md outline-none border border-white focus:ring-2 focus:ring-white placeholder-gray-300"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#2c2c2c] text-white rounded-md outline-none border border-white focus:ring-2 focus:ring-white placeholder-gray-300"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 bg-[#2c2c2c] text-white rounded-md outline-none border border-white focus:ring-2 focus:ring-white"
            >
              <option value="Owner">Owner</option>
              <option value="Manager">Manager</option>
              <option value="User">User</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-white font-bold text-black rounded-md hover:bg-[#e2e2e2] transition-all shadow-md"
          >
            Register
          </button>
          <Toaster className='toaster' richColors position='top-center' />
        </form>
      </div>
    </div>
  );
};

export default Register;
