import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPosts = () => {
    const [postdata, setPostData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getmypost = async (page = 1) => {
        const response = await fetch(`http://localhost:8080/myposts?page=${page}&limit=5`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        const res = await response.json();
        if (response.ok) {
            setPostData(res.posts);
            setTotalPages(res.totalPages);
            setCurrentPage(res.currentPage);
        } else {
            alert(res.message);
        }
    };

    useEffect(() => {
        getmypost(currentPage);
    }, [currentPage]);

    const handleClick = async (id) => {
        const response = await fetch(`http://localhost:8080/deletepost/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        const res = await response.json();
        if (response.ok) {
            getmypost(currentPage); // Refresh posts after deletion
        } else {
            alert(res.message);
        }
    };

    const navigate = useNavigate();
    const handleEditClick = (post) => {
        navigate(`/edit/${post._id}`, { state: { post } });
    };

    return (
        <div>
            <div className="max-w-3xl mx-auto p-4">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">My Posts</h2>
                <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                    {postdata.map((post) => (
                        <div key={post._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                            <p className="text-gray-700 mt-2">{post.description}</p>
                            <div className="flex justify-end gap-2 mt-4">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" onClick={() => handleEditClick(post)}>Edit</button>
                                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" onClick={() => handleClick(post._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center gap-4 mt-4">
                    <button 
                        className={`px-4 py-2 bg-gray-400 text-white rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-500'}`} 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    <span className="text-gray-700 text-lg">Page {currentPage} of {totalPages}</span>

                    <button 
                        className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`} 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyPosts;
