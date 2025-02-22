import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [postdata, setPostData] = useState({
        title: '',
        desc: ''
    });
   const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
       
    
        if (!token) {
            console.log("No token, redirecting to signup");
            navigate('/');
            return;
        }
    
        const response = await fetch('https://opinionbackend.onrender.com/addpost', {
            method: 'POST',
            body: JSON.stringify(postdata),
            headers: {
                'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
            },
        });

        if (response.ok) {
            console.log("Post created successfully!");
            // Reset input fields after successful submission
            setPostData({ title: '', desc: '' });
            navigate('/home')
        }
       
    };

    const handleChange = (e) => {
        setPostData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div>
           <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 shadow-lg rounded-xl border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Your Post</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-medium text-lg mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={postdata.title}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all shadow-md"
              placeholder="Enter post title"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-gray-700 font-medium text-lg mb-2">Description</label>
            <textarea
              name="desc"
              value={postdata.desc}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all h-40 resize-none shadow-md"
              placeholder="Enter post description"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-lg transition-all duration-300"
          >
            🌟 Create Post
          </button>
        </form>
      </div>
    </div>
        </div>
    );
};

export default CreatePost;
