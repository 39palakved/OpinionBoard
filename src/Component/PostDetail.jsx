import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
    
            try {
                const response = await fetch("https://opinionbackend.onrender.com/name", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }
    
                const res = await response.json();
                setName(res.name);  
            
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
    
        fetchUser();
    }, []); 
    const fetchpost =async()=>{
        const response = await fetch(`https://opinionbackend.onrender.com/getpost/${postId}`,{
            method:'GET',
    
          })
          const res= await response.json();
          setPost(res);
    }
    const handleChange =(e)=>{
        setComment(e.target.value);
    }
    useEffect(()=>{
      fetchpost();
    },[])
    const handleVote =async(id,type)=>{
        const response = await fetch(`https://opinionbackend.onrender.com/addpost/${id}/vote`,{
          method : 'PATCH',
          headers: {
            "Content-Type": "application/json",
        }, 
        body : JSON.stringify({type})
        })
        const res= await response.json();
       
       setPost(res)
        
      
    }
    const handleaddComment =async(id,user)=>{
   const response = await  fetch(`https://opinionbackend.onrender.com/addpost/${id}/comments`,{
       method:'PATCH',
       headers: {
        "Content-Type": "application/json",
    }, 
    body:JSON.stringify({comment,user})
    
   })
   const res= await response.json();
   setPost(res);
   setComment("");
    }
  return (
    <div>
      <div class="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">

    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2"></h1>
        <p class=" text-gray-600 font-bold text-2xl">{post.title}</p>
    </div>

   
    <div class="mb-10">
        <p class="text-lg text-gray-800 leading-relaxed">
           {post.description}
        </p>
    </div>

    
    <div class="mt-10">
        <div className="flex items-center space-x-3">
                        <button onClick={() => handleVote(post._id, "upvote")}>
                                            👍
</button>
                                        <span className="text-sm text-gray-500">{post.upvotes}</span>
                                        <button onClick={() => handleVote(post._id, "downvote")}>
                                            👎
                                        </button>
                                        <span className="text-sm text-gray-500">{post.downvotes}</span>
                                        
                                    </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Comments</h3>
        
     
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm mb-6">
    {post.comments && post.comments.length > 0 ? (
        post.comments.map((com, index) => (
            <div key={index}>
                <div className='flex '>
                <img
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH9YiPhXYXWkD7-ZuJemAl6Fw2-akX7DKYQd6JUzYYdklmqnwtAA2vDEc&s"} 
            alt="User Profile"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
        />  
                <p className="font-medium text-gray-700 text-xl">{com.user}</p>
                </div>
                <p className="text-gray-600 text-xl mb-5">{com.text}</p> 
            </div>
        ))
    ) : (
        <p className="text-gray-500">Be the first person to comment.</p>
    )}
</div>

      
        <textarea value ={comment} class="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="4" placeholder="Add a comment..." onChange={handleChange}></textarea>
        <button class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300" onClick={()=>handleaddComment(post._id,name)}>Post Comment</button>
    </div>
</div>
    </div>
  )
}

export default PostDetail
