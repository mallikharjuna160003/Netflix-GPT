import React from 'react'
import { useNavigate } from "react-router-dom";
import {  signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from 'react-redux';

const Header = () => {

  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  
  const handleSingOut =()=>{

    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });

  }

  return (
   
      <div className='flex justify-between w-screen absolute px-8 py-2 bg-gradient-to-b from-black z-10'>
           <img className='w-40' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="header" />
          { user && (<div className='flex p-2'>
              <img  src={user?.photoURL} alt="usericon" className="w-12 h-12"   />
              <button onClick={handleSingOut} className='font-bold text-white'>Sign Out</button>
           </div>)}
             
      </div>
      
   
  )
}

export default Header;
