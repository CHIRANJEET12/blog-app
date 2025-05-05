import React from "react";
import { Link } from "react-router-dom";

export const CoverHome = () => {
  const stories = [
    {
      title: "The Future of AI",
      image: "https://source.unsplash.com/400x300/?technology,ai",
    },
    {
      title: "Traveling to the Alps",
      image: "https://source.unsplash.com/400x300/?mountains,travel",
    },
    {
      title: "Healthy Habits in 2025",
      image: "https://source.unsplash.com/400x300/?health,lifestyle",
    },
    {
      title: "Startup Journey Tips",
      image: "https://source.unsplash.com/400x300/?startup,business",
    },
  ];

  const reviews = [
    {
      name: "Alex Johnson",
      text: "This platform gave me the space to share my thoughts freely and beautifully!",
    },
    {
      name: "Rina Patel",
      text: "As a beginner blogger, this was the easiest and most fun tool I found.",
    },
    {
      name: "David Liu",
      text: "I’ve connected with so many readers and writers. Brilliant interface!",
    },
  ];

  return (
    <div className="bg-white text-black">
        
      <div className="relative min-h-screen flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Share Your Voice With The World
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10">
            Create. Express. Inspire. Join the community of storytellers.
          </p>
          <div className="flex justify-center space-x-6">
            <Link to="/login">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-full shadow-lg transition">
                Log In
              </button>
            </Link>
            <Link to="/reg">
              <button className="bg-white text-black font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-200 transition">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>

      <section className="py-16 bg-gray-50 px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">🔥 Top Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition">
              <img src={story.image} alt={story.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{story.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white px-6 border-t">
        <h2 className="text-3xl font-bold mb-10 text-center">💬 What Our Users Say</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
              <p className="text-gray-700 mb-4">“{review.text}”</p>
              <p className="font-semibold text-indigo-600">— {review.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
