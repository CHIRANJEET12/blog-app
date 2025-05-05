import React, { useState } from 'react';

interface ComProps {
  postId: number;
  comments: string[];
  onAddComment: (postId: number, comment: string) => void;
}

export const Com: React.FC<ComProps> = ({ postId, comments, onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onAddComment(postId, text);
      setText('');
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
        />
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
      <div className="space-y-1">
        {comments.map((comment, idx) => (
          <div
            key={idx}
            className="bg-gray-100 px-3 py-2 rounded text-gray-800"
          >
            {comment}
          </div>
        ))}
      </div>
    </div>
  );
};
