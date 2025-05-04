import React, { useState } from 'react';
import { Post } from '../components/Posts';
export const Home = () => {
    const [show, setShow] = useState(false);


    const handleClick = () => setShow(!show);



    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="input mb-6 relative">
                <input
                    type="text"
                    onClick={handleClick}
                    placeholder="Write a blog..."
                    className="border border-gray-300 rounded p-3 w-full shadow-sm"
                />
                {show && (
                    <div className="absolute top-16 left-0 w-full bg-white border border-gray-300 rounded shadow-lg p-4 z-10">
                        <h2 className="text-lg font-semibold mb-2">Create a new blog</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            className="border border-gray-300 rounded p-2 w-full mb-4"
                        />
                        <textarea
                            placeholder="Content"
                            className="border border-gray-300 rounded p-2 w-full h-32 mb-4"
                        ></textarea>
                        <div className="flex gap-2">
                            <button className="bg-black text-white px-4 py-2 rounded">Submit</button>
                            <button onClick={handleClick} className="bg-black text-white px-4 py-2 rounded">Close</button>
                        </div>
                    </div>
                )}
            </div>
            <Post  />
        </div>
    );
};
