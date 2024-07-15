import React, { useState,useContext, createContext, useEffect } from 'react';
import { Toaster as ToastContainer } from 'react-hot-toast';
import { BrowserRouter,  Route, Routes } from 'react-router-dom';
import Signin from './Signin';
import Home from './Home';
import Navbar from './Navbar';
import Register from './Register';
import axios from 'axios';
import Profile from './Profile';
const AppState = createContext();
export default function App() {
  const[login, setLogin] = useState(false);
  const[userName,setUsername] = useState('');
  const[userId,setUserId] = useState('');
  const[projects,setProjects] = useState([]);
  const[user,setUser] = useState({});
  const[userDetails,setUserDetails] = useState({})
  useEffect(()=>{
    getUser();
  },[])
  async function getUser() {
    try { // Assuming userId is the user ID you want to send
      const user_id = localStorage.getItem('userId')
      const url = 'http://localhost:5000/auth/getuser'; // Define the URL for the getUser endpoint
      const data = { user_id: user_id }; // Define the data to be sent in the request body
  
      // Make a POST request using Axios
      const response = await axios.post(url, data);
     
      // Handle the response
      
      // console.log("details",userDetails)
      console.log(response.data)
      if(response.data!=='false')
      loggedIn(true,response.data.name,response.data._id,response.data);
      
      // return response.data;
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  }
  const getFile = async(id)=>{
    try{
      const res = await axios.post('http://localhost:5000/file/getfile',{userId:id});
      console.log(res.data);
      setProjects(res.data.files);
    }
    catch(e){
      console.log(e);
    }
  }
  function loggedIn(isIn, name, id,details){
    setLogin(isIn);
    setUsername(name);
    const strId = id.toString();
    localStorage.setItem('userId',strId)
    setUserId(strId);
    setUser(details);
    if(isIn){
      getFile(strId);
      console.log(projects);
    }
  }
  return (
    <AppState.Provider value={{loggedIn,login,userName,userId,projects,user,setProjects}}>
      <BrowserRouter>
      {/* <Navbar/> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={login?<Profile/>:<Register />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AppState.Provider>
  );
}
export {AppState};