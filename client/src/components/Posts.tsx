import React, { useEffect, useState } from 'react';
import { Com } from './Com';
import axios from '../axiosConfig'; // Adjust import based on where your axios config is

interface Post {
  id: number;
  name: string;
  title: string;
  content: string;
  imageUrl: string;
  time: string;
  authorImageUrl: string;
}

export const Post = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [comments, setComments] = useState<{ [key: number]: string[] }>({});
  const [activeCommentBox, setActiveCommentBox] = useState<number | null>(null);
  const [expandedImageId, setExpandedImageId] = useState<number | null>(null);



  const toggleExpandedImage = (id: number) => {
    setExpandedImageId((prev) => (prev === id ? null : id))
  }

  useEffect(() => {
    // Fetch posts from backend
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_CON}/getpost`);
        setPosts(response.data);

      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const storedLikes = localStorage.getItem('likes');
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => [...prev, id]);
  };

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const handleLike = async (id: number) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_CON}/likes/${id}`);
      setLikes((prev) => ({ ...prev, [id]: res.data.likes }));
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const toggleCommentBox = (id: number) => {
    setActiveCommentBox((prevId) => (prevId === id ? null : id));
  };

  const handleAddComment = (postId: number, comment: string) => {
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment],
    }));
  };

  return (
    <div className="post space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="relative block">
          <div className="post-item border-gray-200 p-4 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={post.authorImageUrl}
                  alt={post.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <span className="font-medium text-gray-800">{post.name}</span>
                  <span className="text-sm text-gray-500 ml-2">{post.time}</span>
                </div>
              </div>

              <div className="relative">
                <div
                  className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
                  onClick={() => toggleDropdown(post.id)}
                >
                  <span className="text-xl">⋮</span>
                </div>
                {openDropdownId === post.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-20">
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Edit
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Delete
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Share
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>

            <div className="w-full h-64 bg-gray-100 rounded mb-3 overflow-hidden relative">
              {!loadedImages.includes(post.id) && (
                <div className="animate-pulse w-full h-full bg-gray-300 absolute top-0 left-0" />
              )}
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full hover: cursor-pointer object-cover"
                onClick={() => toggleExpandedImage(post.id)}
                onLoad={() => handleImageLoad(post.id)} // Triggering image load handler
              />
            </div>
            {expandedImageId === post.id && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={() => setExpandedImageId(null)}
              >
                <div
                  className="relative bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full"
                  onClick={(e) => e.stopPropagation()} 
                >
                  <img
                    src={post.imageUrl}
                    alt="Expanded view"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            )}



            <p className="text-gray-700 leading-relaxed">{post.content}</p>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => handleLike(post.id)}
                className="bg-red-500 text-white  px-4 py-2 rounded hover: cursor-pointer"
              >
                {likes[post.id] ? likes[post.id] : 0} Like
              </button>
              <button
                onClick={() => toggleCommentBox(post.id)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Comment
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Share</button>
            </div>

            {activeCommentBox === post.id && (
              <Com
                postId={post.id}
                comments={comments[post.id] || []}
                onAddComment={handleAddComment}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
