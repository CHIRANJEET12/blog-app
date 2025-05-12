import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
// import { formatDistanceToNow, parseISO } from 'date-fns';

interface ComProps {
  postId: number;
  comments: { comment: string; createdAt?: string }[]; 
  onAddComment: (postId: number, comment: string) => Promise<void>;
}

export const Com: React.FC<ComProps> = ({ postId, comments: initialComments, onAddComment }) => {
  const [text, setText] = useState('');
  const [comments, setComments] = useState<{ comment: string; createdAt?: string }[]>(initialComments);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_CON}/getcomm/${postId}`);
      setComments(response.data.map((comment: any) => ({ 
        comment: comment.comment,
        createdAt: comment.createdAt,
        post: comment.post,
      })));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async () => {
    if (text.trim()) {
      await onAddComment(postId, text); 
      setText(''); 
      fetchComments(); 
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="mt-4 max-w-3xl mx-auto px-4">
      <div className="flex gap-2 mb-4 items-center border-b border-gray-300 pb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a comment..."
          className="flex-1 p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          aria-label="Comment input"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all focus:outline-none"
          aria-label="Submit comment"
        >
          Post
        </button>
      </div>

      {comments.length > 0 && (
        <div className="space-y-4">
          {comments.map((comment, idx) => (
            <div
              key={`${postId}-${idx}`}
              className="bg-white shadow-sm rounded-lg p-4 flex gap-3 items-start border border-gray-200"
            >
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div> 
              <div className="flex-1">
                <div className="text-sm text-gray-600 mt-1">{comment.comment}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
