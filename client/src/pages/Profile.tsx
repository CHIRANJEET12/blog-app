import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { FiExternalLink } from 'react-icons/fi';

interface ProfileProps {
  name: string;
  age: number;
  email: string;
  image: string;
  bio: string;
  location: string;
  website: string;
  twitter: string;
  github: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  portfolio: string;
  resume: string;
}

const ProfileForm: React.FC = () => {
  const [profile, setProfile] = useState<ProfileProps>({
    name: '',
    age: 0,
    email: localStorage.getItem('email') || '',
    image: '',
    bio: '',
    location: '',
    website: '',
    twitter: '',
    github: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    portfolio: '',
    resume: '',
  });

  const [loading, setLoading] = useState(false); // Add loading state for form submission

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profile.email) return;
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_CON}/profile`, {
          params: { email: profile.email },
        });
        localStorage.setItem('name', res.data.name);
        setProfile(res.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [profile.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('email', profile.email);

    setLoading(true); // Set loading to true when submission starts

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_CON}/profile`, profile);
      console.log(res.data);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  const NavigateIcon: React.FC<{ url: string }> = ({ url }) => {
    return url ? (
      <a
        href={url.startsWith('http') ? url : `https://${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 inline-flex items-center text-white hover:text-gray-400"
      >
        <FiExternalLink className="text-white" />
      </a>
    ) : null;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Profile Setup</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={profile.age}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Bio</label>
            <input
              type="text"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Website</label>
            <input
              type="text"
              name="website"
              value={profile.website}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <NavigateIcon url={profile.website} />
          </div>
          <div>
            <label className="block text-sm font-medium">Twitter</label>
            <input
              type="text"
              name="twitter"
              value={profile.twitter}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <NavigateIcon url={profile.twitter} />
          </div>
          <div>
            <label className="block text-sm font-medium">GitHub</label>
            <input
              type="text"
              name="github"
              value={profile.github}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <NavigateIcon url={profile.github} />
          </div>
          <div>
            <label className="block text-sm font-medium">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={profile.linkedin}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <NavigateIcon url={profile.linkedin} />
          </div>
          <div>
            <label className="block text-sm font-medium">Facebook</label>
            <input
              type="text"
              name="facebook"
              value={profile.facebook}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <NavigateIcon url={profile.facebook} />
          </div>
          <div>
            <label className="block text-sm font-medium">Instagram</label>
            <input
              type="text"
              name="instagram"
              value={profile.instagram}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <NavigateIcon url={profile.instagram} />
          </div>
          <div>
            <label className="block text-sm font-medium">Portfolio</label>
            <input
              type="text"
              name="portfolio"
              value={profile.portfolio}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <NavigateIcon url={profile.portfolio} />
          </div>
          <div>
            <label className="block text-sm font-medium">Resume</label>
            <input
              type="text"
              name="resume"
              value={profile.resume}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white bg-black rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <NavigateIcon url={profile.resume} />
          </div>
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-black text-white rounded-md hover:bg-white hover:text-black transition duration-200"
            disabled={loading} // Disable the button when loading
          >
            {loading ? 'Saving...' : 'Save'} {/* Show loading text */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
