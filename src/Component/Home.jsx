
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [data, setData] = useState([]); // Stores the posts
    const [totalPages, setTotalPages] = useState(1); // Stores total pages
    const [currentPage, setCurrentPage] = useState(1); // Stores current page
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("http://localhost:8080/name", {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) throw new Error("Failed to fetch user");

                const res = await response.json();
                setName(res.name);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:8080/getpost?page=${currentPage}&limit=6`,
                    {
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                    return;
                }

                if (!response.ok) throw new Error("Failed to fetch posts");

                const res = await response.json();
                setData(res.posts); // Updated to store posts array
                setTotalPages(res.totalPages); // Store total pages
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchData();
    }, [currentPage, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            {/* Header */}
            <header className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6 shadow-lg sticky top-0 z-20 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <h1 className="text-3xl font-semibold tracking-wide text-gray-100">
                        Opinion Board
                    </h1>
                </div>
                <nav className="flex space-x-8">
                    <div className="flex items-center space-x-3">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH9YiPhXYXWkD7-ZuJemAl6Fw2-akX7DKYQd6JUzYYdklmqnwtAA2vDEc&s"
                            alt="User Profile"
                            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                        />
                        <div className="text-white text-lg font-medium">{name}</div>
                    </div>

                    <button
                        onClick={() => navigate("/userposts")}
                        className="hover:text-gray-200 transition-all text-lg font-medium"
                    >
                        My Posts
                    </button>
                    <button
                        onClick={handleLogout}
                        className="hover:text-gray-200 transition-all text-lg font-medium"
                    >
                        Logout
                    </button>
                </nav>
            </header>

            {/* Create Post Button */}
            <div className="sticky top-20 flex justify-center mt-6 z-20">
                <button
                    className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300"
                    onClick={() => navigate("/create")}
                >
                    Create New Post
                </button>
            </div>

            {/* Posts Section */}
            <div className="max-w-7xl mx-auto p-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Latest Posts
                </h1>

                {data.length === 0 ? (
                    <p className="text-center text-gray-600">No posts available</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {data.map((post) => (
                            <div
                                key={post._id}
                                className="bg-gray-100 shadow-lg rounded-xl p-6 transition transform hover:scale-105 hover:shadow-2xl hover:bg-gray-200 max-w-4xl mx-auto"
                                style={{ minHeight: "200px" }}
                            >
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3 text-xl">
                                    {post.description}
                                </p>

                                <div className="flex justify-between items-center mt-15">
                                    <button
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium text-sm"
                                        onClick={() => navigate(`/postdetail/${post._id}`)}
                                    >
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                <div className="flex justify-center mt-6 space-x-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${
                            currentPage === 1
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                        }`}
                    >
                        Previous
                    </button>
                    <span className="text-lg font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded ${
                            currentPage === totalPages
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
