import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Reg = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true); // Start loading
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_CON}/reg`, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (res && res.data) {
        localStorage.setItem('reg-token', res.data.token);
        localStorage.setItem('name', res.data.name);

        alert('Successfully registered!');
        navigate('/login');
      }
      console.log(res.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error('Registration failed:', err.response?.data || err.message);
        alert('Error: ' + (err.response?.data?.message || 'Something went wrong'));
      } else {
        console.error('An unexpected error occurred:', err);
      }
    } finally {
      setLoading(false); // Stop loading after the request completes
    }
  };

  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
          <p className="text-xl text-gray-600 text-center">Create your account</p>

          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                disabled={loading} // Disable button during loading
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>

            <div className="mt-4 text-center">
              <a href="/login" className="text-xs text-gray-500 uppercase">
                Already have an account? Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
