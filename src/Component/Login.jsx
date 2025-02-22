import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({})
    const handleClick =()=>{
        navigate('/');
    }
const handleSubmit =async(e)=>{
     e.preventDefault();
     const response = await fetch("https://opinionbackend.onrender.com/getuser",{
        method : 'POST',
        headers:{
            'Content-Type' : 'application/json',
             
        },
        body:JSON.stringify(user)


     })
     const data = await response.json();

     if (response.ok) {

         localStorage.setItem("token", data.token);  // Store JWT token
        
         alert("Login Successful");
         navigate("/home");
     } else {
         alert(data.message);
     }

}
const handleChange = (e)=>{
    setUser({
       ...user,
       [e.target.name] : e.target.value
    })
}
  return (
    <div>
      <div class="flex justify-center items-center min-h-screen bg-gradient-to-r">
    <div class="w-full max-w-md bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/20">
        <h2 class="text-3xl font-bold text-gray-800 text-center mb-6">🔐 Login</h2>

        <form class="space-y-6" onSubmit={handleSubmit}>
            
            <div>
                <label class="block text-gray-700 font-medium text-lg mb-2">Email</label>
                <input type="email" name="email" onChange={handleChange} class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all shadow-md" placeholder="Enter your email" required/>
            </div>

           
            <div>
                <label class="block text-gray-700 font-medium text-lg mb-2">Password</label>
                <input type="password" onChange={handleChange} name="password" class="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all shadow-md" placeholder="Enter your password" required/>
            </div>

           
            <button type="submit" class="w-full bg-blue-300 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300">
                🚀 Login
            </button>
        </form>

       
        <p class="text-gray-700 text-center mt-4">
            Don't have an account? 
            <a href="#" class="text-blue-500 font-semibold hover:underline" onClick={handleClick}>Sign Up</a>
        </p>
    </div>
</div>

    </div>
  )
}

export default Login
