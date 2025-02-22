import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EditPost = () => {
  const location  = useLocation();
  const navigate = useNavigate();
  const{post} = location.state;
  const [title, setTitle]= useState(post?.title);
  const[description, setDesc] = useState(post?.description);
  const handletitlechange =(e)=>{
    setTitle(e.target.value);
  }
  const handledescchange =(e)=>{
    setDesc(e.target.value);
  }
  const handlesavechange =async()=>{
    const response = await fetch(`http://localhost:8080/editpost/${post._id}`,{
      method:'PATCH',
      headers:{
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({title:title,description:description})
    })
    navigate('/userposts');
  }
  return (
    <div>
      <div class="container mx-auto p-6">
        <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg border">
            <h2 class="text-2xl font-bold mb-4 text-center text-indigo-600">Edit Your Post</h2>

           
            <div class="mb-4">
                <label class="block text-gray-700 font-semibold mb-2">Title</label>
                <input type="text" value={title} class="form-control w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={handletitlechange}/>
            </div>

           
            <div class="mb-4">
                <label class="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea class="form-control w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="5" onChange={handledescchange}>{description}</textarea>
            </div>


            <div class="flex justify-between mt-6">
                <button class="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition" onClick={()=>{navigate('/userposts')}}>
                    Cancel
                </button>
                <button class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition" onClick={handlesavechange}>
                    Save Changes
                </button>
            </div>
        </div>
    </div>

    </div>
  )
}

export default EditPost
