import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
const Profile = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [resume,setResume]=useState("");
    const [profile ,setProfile]=useState("");
    const[showUpdate,setShowUpdate] = useState(false);
    useEffect(()=>{
        console.log("resume button clicked");
        const userid = localStorage.getItem('userId');
        console.log("userid",userid);
        axios.post('http://localhost:9000/profile',{userid})
        .then((res)=>{
            console.log("res from profile = ",res.data);
            setName(res.data.name);
            setEmail(res.data.email)
        })
        .catch((err)=>{
            console.log("err from profile",err);
        })
    })

    const handleChange=(e,key)=>{
        if(key==='name'){
            setName(e.target.value)
        }
        if(key==='email'){
            setEmail(e.target.value)
        }
        if(key==='resume'){
            setResume(e.target.value)
        }if(key==='profile'){
            setProfile(e.target.value)
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("submit clicked");
        const user = {
          'name':name,
          'email':email,
          'resume':resume,
          'profile':profile,
      }
        axios.post('http://localhost:9000/update',{user})
        .then(res=>{
            console.log("data ",res.data);
            console.log("success");
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId',res.data.userId);
            localStorage.setItem('name',name)
            
        })
        .catch(e)
          
      }
  return (
    <div>
<h2>Profile Details</h2>
<h3>username : {name}</h3>
<h3>user email: {email}</h3>
{
    showUpdate?

        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e)=>handleChange(e,name)}/>
    
  </div>
  <div class="form-group">
    <label for="exampleInputPhone">Phone Number</label>
    <input type="phone" class="form-control" id="exampleInputPhone" aria-describedby="phoneHelp" placeholder="Enter Phone" onChange={(e)=>handleChange(e,email)}/>
    
  </div>
  <label class="form-label" for="customFile">Upload Resume</label>
<input type="file" class="form-control" id="customFile" onChange={(e)=>handleChange(e,resume)}/>
<label class="form-label" for="customFile">Upload Profile Picture</label>
<input type="file" class="form-control" id="customFile" onChange={(e)=>handleChange(e,profile)}/>
  
  
  <button type="submit" className="m-2 btn btn-primary" onClick={(e)=>handleSubmit(e)}>Submit</button>
  <button type="submit" className="m-2 btn btn-danger" onClick={(e)=>setShowUpdate(false)}>Cancel</button>
</form>
:<div>
    <button type="submit" class="btn btn-primary" onClick={(e)=>setShowUpdate(true)}>Update</button>
</div>
}
      </div>
 
   
  )
}

export default Profile;