import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

const mockAnalytics = {
  totalUsers: 1000,
  activeUsers: 750,
  revenue: 50000,
};

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState('users');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/allusers');
        setUsers(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const removeUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(`Failed to delete user: ${err.message} (${err.status})`);
      toast.error("Unable to delete");
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="bg-[#0a0a0a] p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <nav>
          <button 
            onClick={() => setSelectedTab('users')}
            className={`px-4 py-2 mr-2  ${selectedTab === 'users' ? 'bg-white text-black' : 'bg-transparent text-white' } rounded`}
          >
            Users
          </button>
          <button 
            onClick={() => setSelectedTab('analytics')}
            className={`px-4 py-2 ${selectedTab === 'analytics' ? 'bg-white text-black' : 'bg-transparent'} rounded`}
          >
            Analytics
          </button>
        </nav>
      </header>

      <main className="p-8">
        {selectedTab === 'users' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#0a0a0a]">
                    <th className="p-2 text-center">Username</th>
                    <th className="p-2 text-center">Role</th>
                    <th className="p-2 text-center">Joined Date</th>
                    <th className="p-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className="border-b border-[#202020]">
                      <td className="p-2 text-center">{user.username}</td>
                      <td className="p-2 text-center">
                        <span className="bg-gray-200 text-black text-sm px-2 py-1 rounded">
                          {user.role}
                        </span>
                      </td>
                      <td className="p-2 text-center">{formatDate(user.createdAt)}</td>
                      <td className="p-2 text-center">
                        <button 
                          onClick={() => removeUser(user._id)}
                          className="bg-red-700 hover:bg-red-900 text-white px-2 py-1 rounded text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Data Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0a0a0a] p-4 rounded">
                <h3 className="text-lg font-medium mb-2">Total Users</h3>
                <p className="text-3xl">{mockAnalytics.totalUsers}</p>
              </div>
              <div className="bg-[#0a0a0a] p-4 rounded">
                <h3 className="text-lg font-medium mb-2">Active Users</h3>
                <p className="text-3xl">{mockAnalytics.activeUsers}</p>
              </div>
              <div className="bg-[#0a0a0a] p-4 rounded">
                <h3 className="text-lg font-medium mb-2">Revenue</h3>
                <p className="text-3xl">${mockAnalytics.revenue}</p>
              </div>
            </div>
          </div>
        )}
        <Toaster richColors position='top-center'/>
      </main>
    </div>
  );
}