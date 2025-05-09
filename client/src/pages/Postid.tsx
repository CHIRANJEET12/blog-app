import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Post {
  id: number;
  name: string;
  title: string;
  content: string;
  imageUrl: string;
  time: string;
}

export const Postid: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_CON}/post/${id}`);
        setPost(res.data);
      } catch {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">No post found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <Link to="/" className="text-indigo-600 hover:underline mb-6 inline-block">
        ← Back to all posts
      </Link>

      {/* Post Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
              <img
                src={post.imageUrl} 
                alt={post.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-800">{post.name}</p>
              <p className="text-sm text-gray-500">{new Date(post.time).toLocaleString()}</p>
            </div>
          </div>

          {/* Post Content */}
          <article className="prose max-w-none text-gray-700">
            {post.content.split('\n').map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
};
