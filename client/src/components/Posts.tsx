import React, { useEffect, useState } from 'react';
import { Com } from './Com';

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
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [comments, setComments] = useState<{ [key: number]: string[] }>({});
  const [activeCommentBox, setActiveCommentBox] = useState<number | null>(null);

  useEffect(()=>{
    const storedlikes = localStorage.getItem('likes');
    if(storedlikes){
        setLikes(JSON.parse(storedlikes));
    }
  },[]);

  useEffect(() => {
  localStorage.setItem('likes',JSON.stringify(likes));
},[likes]);
    

  const posts: Post[] = [
    {
      id: 1,
      name: 'John Doe',
      title: 'Blog Post 1',
      time: '2 hours ago',
      content: 'This is the content of blog post 1.',
      imageUrl: 'https://via.placeholder.com/600x250',
      authorImageUrl: 'https://i.pravatar.cc/40?img=1',
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'Blog Post 2',
      time: '3 hours ago',
      content: 'This is the content of blog post 2.',
      imageUrl: 'https://via.placeholder.com/600x250',
      authorImageUrl: 'https://i.pravatar.cc/40?img=2',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      title: 'Blog Post 3',
      time: '4 hours ago',
      content: 'This is the content of blog post 3.',
      imageUrl: 'https://via.placeholder.com/600x250',
      authorImageUrl: 'https://i.pravatar.cc/40?img=3',
    },
  ];

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => [...prev, id]);
  };

  const toggleDropdown = (id: number) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const handleLike = (id: number) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
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
          <div className="post-item  border-gray-200 p-4 bg-white ">
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
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Delete</button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Share</button>
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
                className={`w-full h-full object-cover transition-opacity duration-300 ${loadedImages.includes(post.id) ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => handleImageLoad(post.id)}
              />
            </div>

            <p className="text-gray-700 leading-relaxed">{post.content}</p>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => handleLike(post.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                {likes[post.id] } Like
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
