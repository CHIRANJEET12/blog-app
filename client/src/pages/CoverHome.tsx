import React from "react";
import { Link } from "react-router-dom";

export const CoverHome = () => {
const stories = [
  {
    title: "The Future of AI",
    image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Traveling to the Alps",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Healthy Habits in 2025",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Startup Journey Tips",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
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
              <button className="bg-gradient-to-r border-white from-black via-gray-900 to-blue-900 text-white font-bold px-8 py-3  shadow-xl hover:scale-105 hover:from-indigo-800 hover:to-purple-700 transition-all duration-300 ease-in-out">
                Log In
              </button>
            </Link>
            <Link to="/reg">
              <button className="bg-white text-black font-bold px-8 py-3  shadow-xl border-2 border-black hover:bg-gradient-to-r hover:from-white hover:to-gray-100 hover:scale-105 transition-all duration-300 ease-in-out">
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

<section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white px-6 border-t">
  <h2 className="text-4xl font-extrabold mb-14 text-center text-gray-800">💬 What Our Users Say</h2>
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
    {reviews.map((review, idx) => (
      <div
        key={idx}
        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
      >
        <p className="text-gray-600 italic mb-6 leading-relaxed">“{review.text}”</p>
        <p className="font-bold text-indigo-700 text-right">— {review.name}</p>
      </div>
    ))}
  </div>
</section>

    </div>
  );
};
