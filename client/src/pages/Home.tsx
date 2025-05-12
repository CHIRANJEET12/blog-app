import React, { useState } from 'react';
import { Post } from '../components/Posts';
import axios from '../axiosConfig';

type FormData = {
  title: string;
  content: string;
  image: File | null;
};

export const Home = () => {
  const [show, setShow] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    image: null,
  });
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true); // Set loading to true on form submit

    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    let base64Image = '';

    if (formData.image) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        base64Image = reader.result as string;

        try {
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_CON}/addposts`, {
            title: formData.title,
            content: formData.content,
            image: base64Image,
            name,
            email,
          });
          console.log(res.data.message);
          alert('Post created');
          setFormData({ title: '', content: '', image: null });
          window.location.reload();
          setShow(false);
        } catch (err: any) {
          alert(err.response?.data?.message || 'Error');
        } finally {
          setLoading(false); // Stop loading after request completes
        }
      };
      reader.readAsDataURL(formData.image);
    }
  };

  const handleClick = () => setShow(!show);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="input mb-6 relative">
        <input
          type="text"
          onClick={handleClick}
          placeholder="Write a blog..."
          className="border border-gray-300 rounded p-3 w-full shadow-sm"
        />
        {show && (
          <form
            onSubmit={handleSubmit}
            className="absolute top-16 left-0 w-full bg-white border border-gray-300 rounded shadow-lg p-4 z-10"
          >
            <h2 className="text-lg font-semibold mb-2">Create a new blog</h2>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full mb-4"
            />

            <textarea
              name="content"
              placeholder="Content"
              value={formData.content}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2 w-full h-32 mb-4"
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add an image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0 file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
                disabled={loading} // Disable the submit button when loading
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>
      <Post />
    </div>
  );
};
