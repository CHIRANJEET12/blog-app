import { useCallback, useEffect, useState } from 'react';
import { Com } from './Com';
import axios from '../axiosConfig';

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [edit, setEdit] = useState<Post | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [comments, setComments] = useState<{ [key: number]: { comment: string; createdAt?: string }[] }>({});
  const [activeCommentBox, setActiveCommentBox] = useState<number | null>(null);
  const [expandedImageId, setExpandedImageId] = useState<number | null>(null);
  
  // Loading states
  const [loadingStates, setLoadingStates] = useState({
    posts: false,
    likes: {} as Record<number, boolean>,
    comments: {} as Record<number, boolean>,
    editing: false,
    deleting: false,
    sharing: {} as Record<number, boolean>,
  });

  // Fetch posts from backend on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingStates(prev => ({ ...prev, posts: true }));
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_CON}/getpost`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoadingStates(prev => ({ ...prev, posts: false }));
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
    setLoadingStates(prev => ({ ...prev, sharing: { ...prev.sharing, [postId]: true } }));
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
    } finally {
      setLoadingStates(prev => ({ ...prev, sharing: { ...prev.sharing, [postId]: false } }));
    }
  };

  const toggleDropdown = useCallback((id: number) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  }, []);

  const handleLike = useCallback(async (id: number) => {
    setLoadingStates(prev => ({ ...prev, likes: { ...prev.likes, [id]: true } }));
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_CON}/likes/${id}`);
      setLikes((prev) => ({ ...prev, [id]: res.data.likes }));
    } catch (error) {
      console.error('Error liking the post:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, likes: { ...prev.likes, [id]: false } }));
    }
  }, []);

  const toggleCommentBox = useCallback((id: number) => {
    setActiveCommentBox((prevId) => (prevId === id ? null : id));
  }, []);

  const handleAddComment = useCallback(async (postId: number, comment: string) => {
    setLoadingStates(prev => ({ ...prev, comments: { ...prev.comments, [postId]: true } }));
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
    } finally {
      setLoadingStates(prev => ({ ...prev, comments: { ...prev.comments, [postId]: false } }));
    }
  }, []);

  const handelEdit = useCallback((id: number) => {
    const postToEdit = posts.find((post) => post.id === id);
    if (postToEdit) {
      setEdit(postToEdit);
    }
  }, [posts]);

  const handleSaveEdit = useCallback(async (updatedPost: Post) => {
    setLoadingStates(prev => ({ ...prev, editing: true }));
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_CON}/edit/${updatedPost.id}`, updatedPost);
      setPosts(prevPosts =>
        prevPosts.map(post => (post.id === updatedPost.id ? res.data : post))
      );
      setEdit(null);
      window.location.reload();
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, editing: false }));
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
    setLoadingStates(prev => ({ ...prev, deleting: true }));
    if (deleteId !== null) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_CON}/delete/${deleteId}`);
        setPosts(posts.filter(post => post.id !== deleteId));
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error('Error deleting post:', error);
      } finally {
        setLoadingStates(prev => ({ ...prev, deleting: false }));
      }
    }
  };

  const memoizedPosts = posts;

  return (
    <div className="post space-y-6">
      {loadingStates.posts && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      {memoizedPosts.map((post) => (
        <div key={post.id} className="relative block">
          <div className="post-item border-gray-200 p-4 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div>
                  <span className="font-medium text-gray-800 hover:  cursor-pointer">{post.name}</span>
                  {/* <span className="text-sm text-gray-500 ml-2">
                    {post.created_at ? formatDistanceToNow(parseISO(post.created_at), { addSuffix: true }) : 'Unknown time'}
                  </span> */}
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
                    <button 
                      onClick={() => handelEdit(post.id)} 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handelDel(post.id)} 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                    <button 
                      onClick={() => handleShare(post.id)} 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                      disabled={loadingStates.sharing[post.id]}
                    >
                      {loadingStates.sharing[post.id] ? (
                        <>
                          <span className="mr-2">Sharing...</span>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900"></div>
                        </>
                      ) : 'Share'}
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
                    className="bg-green-500 text-white px-4 py-2 rounded flex items-center justify-center"
                    disabled={loadingStates.editing}
                  >
                    {loadingStates.editing ? (
                      <>
                        <span className="mr-2">Saving...</span>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      </>
                    ) : 'Save'}
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
                className="bg-red-500 text-white px-4 py-2 rounded hover:cursor-pointer flex items-center justify-center"
                disabled={loadingStates.likes[post.id]}
              >
                {loadingStates.likes[post.id] ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                ) : null}
                {likes[post.id] || 0} Like
              </button>
              <button
                onClick={() => toggleCommentBox(post.id)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover: cursor-pointer"
              >
                Show Comment
              </button>
              <button
                onClick={() => handleShare(post.id)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover: cursor-pointer flex items-center"
                disabled={loadingStates.sharing[post.id]}
              >
                {loadingStates.sharing[post.id] ? (
                  <>
                    <span className="mr-2">Sharing...</span>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900"></div>
                  </>
                ) : 'Share'}
              </button>
            </div>

            {/* Comment section */}
            {activeCommentBox === post.id && (
              <Com
                postId={post.id}
                comments={comments[post.id] || []}
                onAddComment={handleAddComment}
                isLoading={loadingStates.comments[post.id]}
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
                className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center"
                disabled={loadingStates.deleting}
              >
                {loadingStates.deleting ? (
                  <>
                    <span className="mr-2">Deleting...</span>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  </>
                ) : 'Yes, Delete'}
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