import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
  const [userdata ,setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const handleClick = ()=>{
    navigate('/login')
  }
  const handleChange =async(e)=>{
    setUserData({
        ...userdata,
        [e.target.name] : e.target.value
        
    })
    
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
                
          },
          body: JSON.stringify(userdata)
      });

      const data = await response.json();  
      console.log("Server Response:", data);  // Debugging ke liye

      alert(data.message || "Signup failed");  // Ensure message exists

      if (response.ok) {
          navigate("/login");
      }

  } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong!");
  }
    e.target.reset();
};

  return (
    <div>
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r">
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">🚀 Sign Up</h2>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
           
            <div>
                <label className="block text-gray-700 font-medium mb-2">Username</label>
                <input type="text" name="name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-md" placeholder="Enter your username"  onChange={handleChange} required/>
            </div>

  
            <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input type="email" name="email"  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-md" placeholder="Enter your email"  onChange={handleChange} required/>
            </div>

           
            <div>
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <input type="password" name ="password"  onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-md" placeholder="Enter your password" required/>
            </div>

           
            <div>
                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                <input type="number" name="phone" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-md" placeholder="Enter custom info" required/>
            </div>

       
            <button type="submit" className="w-full bg-blue-300 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300">
                🚀 Create Account
            </button>
        </form>

       
        <p className="text-gray-600 text-center mt-4">
            Already have an account? <a href="#" className="text-blue-500 font-semibold hover:underline" onClick={handleClick}>Login</a>
        </p>
    </div>
    
</div>

    </div>
  )
}

export default Signup

