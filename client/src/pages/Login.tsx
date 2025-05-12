import React, { useState } from 'react';
import axios from '../axiosConfig'; // adjust path if different

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login = ({ onLoginSuccess }: LoginProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); // New loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_CON}/login`, formData);

      if (res && res.data?.token) {
        console.log('res:', res);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('islogin', 'true');

        onLoginSuccess();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed');
      console.error('Login error:', err);
    } finally {
      setLoading(false); // Reset loading to false after the request completes
    }
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')"
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Welcome Back</h2>
          <p className="text-xl text-gray-600 text-center">Login to your account</p>

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-200 border rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:shadow-outline"
                placeholder="you@example.com"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-200 border rounded w-full py-2 px-4 text-gray-700 focus:outline-none focus:shadow-outline"
                placeholder="••••••••"
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                disabled={loading} // Disable the button during loading
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin"></div>
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </div>

            <div className="mt-4 text-center">
              <a href="/reg" className="text-xs text-gray-500 uppercase">
                Don't have an account? Register
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
