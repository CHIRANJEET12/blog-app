import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

interface ComProps {
  postId: number;
  comments: Array<{ comment: string; createdAt?: string }>;
  onAddComment: (postId: number, comment: string) => void;
  isLoading?: boolean;
}

export const Com: React.FC<ComProps> = ({ postId, comments: initialComments, onAddComment, isLoading }) => {
  const [text, setText] = useState('');
  const [comments, setComments] = useState<{ comment: string; createdAt?: string }[]>(initialComments);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_CON}/getcomm/${postId}`);
      setComments(response.data.map((comment: any) => ({
        comment: comment.comment,
        createdAt: comment.createdAt,
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
    <div className="mt-4">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="border border-gray-300 rounded p-2 w-full"
          disabled={isLoading}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="mr-2">Posting...</span>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            </>
          ) : (
            'Submit'
          )}
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
