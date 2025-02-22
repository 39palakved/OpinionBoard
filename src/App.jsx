import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Component/Home'
import CreatePost from './Component/CreatePost'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import PostDetail from './Component/PostDetail'
import Signup from './Component/Signup'
import Login from './Component/Login'
import MyPosts from './Component/MyPosts'
import EditPost from './Component/EditPost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
           
            <Route path="/home" element={<Home />} />
                    
         <Route path="/create" element={<CreatePost />} />
        <Route path="/postdetail/:postId" element={<PostDetail />} />
        <Route path="/userposts" element={<MyPosts />} />
        <Route path="/edit/:id" element={<EditPost/>} />  
           
        </Routes>
    </Router>
);
}

export default App
