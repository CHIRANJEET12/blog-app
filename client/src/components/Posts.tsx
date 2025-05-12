import React, { useCallback, useEffect, useState } from 'react';
import { Com } from './Com';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';
import { formatDistanceToNow, parseISO } from 'date-fns';
interface Post {
  id: number;
  name: string;
  title: string;
  content: string;
  imageUrl: string;
  time: string;
  authorImageUrl: string;
  created_at: string;
}

export const Post = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [edit, setEdit] = useState<Post | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<{ [key: number]:{ comment: string; createdAt?: string }[] }>({});
  const [activeCommentBox, setActiveCommentBox] = useState<number | null>(null);
  const [expandedImageId, setExpandedImageId] = useState<number | null>(null);

  // Fetch posts from backend on component mount
  useEffect(() => {
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

  // Load likes from localStorage on component mount
  useEffect(() => {
    const storedLikes = localStorage.getItem('likes');
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    }
  }, []);

  // Save likes to localStorage when they change
  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  const handleImageLoad = useCallback((id: number) => {
    setLoadedImages((prev) => [...prev, id]);
  }, []);

  const handleShare = async (postId: number) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_CON}/post/${postId}`);

      if (res.status !== 200 || !res.data) {
        throw new Error('Post not found');
      }

      const postUrl = `${window.location.origin}/post/${postId}`;
      await navigator.clipboard.writeText(postUrl);
      alert('Post link copied!');
    } catch (err) {
      console.error('Failed to copy:', err instanceof Error ? err.message : 'Unknown error');
      alert('Failed to copy post link.');
    }
  };

  const toggleDropdown = useCallback((id: number) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  }, []);

  const handleLike = useCallback(async (id: number) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_CON}/likes/${id}`);
      setLikes((prev) => ({ ...prev, [id]: res.data.likes }));
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }, []);

  const toggleCommentBox = useCallback((id: number) => {
    setActiveCommentBox((prevId) => (prevId === id ? null : id));
  }, []);

  const handleAddComment = useCallback(async (postId: number, comment: string) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_CON}/postcomm/${postId}`,
        { comment }
      );

      if (res.status === 200 || res.status === 201) {
        setComments(prev => ({
          ...prev,
          [postId]: [...(prev[postId] || []), res.data],
        }));
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  }, []);


  const handelEdit = useCallback((id: number) => {
    const postToEdit = posts.find((post) => post.id === id);
    if (postToEdit) {
      setEdit(postToEdit);
    }
  }, [posts]);

  const handleSaveEdit = useCallback(async (updatedPost: Post) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_CON}/edit/${updatedPost.id}`, updatedPost);
      setPosts(prevPosts =>
        prevPosts.map(post => (post.id === updatedPost.id ? res.data : post))
      );
      setEdit(null);
      window.location.reload();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }, []);



  const toggleExpandedImage = useCallback((id: number) => {
    setExpandedImageId((prev) => (prev === id ? null : id));
  }, []);

  const handelDel = (id: number) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeletePost = async () => {
    if (deleteId !== null) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_CON}/delete/${deleteId}`);
        setPosts(posts.filter(post => post.id !== deleteId));
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const memoizedPosts = posts;

  return (
    <div className="post space-y-6">
      {memoizedPosts.map((post) => (
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
                  <span className="font-medium text-gray-800 hover:  cursor-pointer">{post.name}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    {post.created_at ? formatDistanceToNow(parseISO(post.created_at), { addSuffix: true }) : 'Unknown time'}
                  </span>

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
                    <button onClick={() => handelEdit(post.id)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Edit
                    </button>
                    <button onClick={() => handelDel(post.id)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Delete
                    </button>
                    <button onClick={() => handleShare(post.id)} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Share
                    </button>
                  </div>
                )}
              </div>
            </div>

            {edit && edit.id === post.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={edit.title}
                  onChange={(e) => setEdit({ ...edit, title: e.target.value })}
                  className="border p-2 w-full"
                />
                <textarea
                  value={edit.content}
                  onChange={(e) => setEdit({ ...edit, content: e.target.value })}
                  className="border p-2 w-full"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(edit)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEdit(null)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 leading-relaxed">{post.content}</p>
              </>
            )}

            <div className="w-full h-64 bg-gray-100 rounded mb-3 overflow-hidden relative">
              {!loadedImages.includes(post.id) && (
                <div className="animate-pulse w-full h-full bg-gray-300 absolute top-0 left-0" />
              )}
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full hover:cursor-pointer object-cover"
                onClick={() => toggleExpandedImage(post.id)}
                onLoad={() => handleImageLoad(post.id)}
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

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => handleLike(post.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:cursor-pointer"
              >
                {likes[post.id] || 0} Like
              </button>
              <button
                onClick={() => toggleCommentBox(post.id)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover: cursor-pointer"
              >
                Comment
              </button>
              <button
                onClick={() => handleShare(post.id)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover: cursor-pointer">
                Share
              </button>
            </div>

            {/* Comment section */}
            {activeCommentBox === post.id && (
          <Com
            postId={post.id}
            comments={comments[post.id] || []} // Ensure the fallback to empty array if no comments yet
            onAddComment={handleAddComment}
          />
            )}
          </div>
        </div>
      ))}

      {/* Delete confirmation modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Are you sure you want to delete this post?</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleDeletePost}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};