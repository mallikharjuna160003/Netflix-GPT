import { useState, useRef } from 'react';
import Header from './Header';
import checkValidData from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [isSignInForm,setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const toggleSignInForm = () =>{
      setIsSignInForm(!isSignInForm);
  }
  const handleButtonClick = () => {
    // validate the form data
    const message = checkValidData(email.current.value,password.current.value);
    setErrorMessage(message);
    // Sign Up logic
    if(!isSignInForm){
      // Sign Up logic
      if (message) return;
          createUserWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          )
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          
          updateProfile(user, {
            displayName: fullname.current.value, 
            photoURL: "https://wellgroomedgentleman.com/media/images/Tony_Stark_Beard_with_Quiff_Hairstyle.width-800.jpg"
          }).then(() => {
            // Profile updated!
            console.log(user.displayName);
            const { uid, email, displayName,photoURL } =auth.currentUser;
            dispatch(
              addUser({
                uid:uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
            navigate("/browse")
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message);
          });

          navigate("/browse");
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);

        });
    }
    else{
      // Sing In Logic
      signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate("/browse");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
      });

    }

}
  return (
    <div>
      <Header/>
      <div className='absolute'>
          <img src="https://assets.nflxext.com/ffe/siteui/vlv3/855ed6e2-d9f1-4afd-90da-96023ec747c3/85eb5b91-25ed-4965-ace9-ba8e4a0ead8d/IN-en-20230828-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="banner" />
      </div>
      
      <form onSubmit={(e)=>e.preventDefault()} className="absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
          <h1 className='font-bold text-3xl py-4'>
            {isSignInForm ? "Sign In":"Sign Up"}
          </h1>

          {!isSignInForm && (
          <input ref={fullname} type="text" placeholder='Full Name' className='p-4 m-4 w-full bg-gray-700' />
          )}

          <input ref={email} required type="text" placeholder='Email Address' className='p-4 m-4 w-full bg-gray-700' />
          <input ref={password} required type="password" placeholder='Password' className='p-4 m-4 w-full bg-gray-700' />
          <p className='font-bold text-lg py-2 text-red-500'>{errorMessage} </p>
          <button className='py-4 m-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
            {isSignInForm ? "Sign In":"Sign Up"}</button>
          <p className='py-4 ' onClick={toggleSignInForm}> 
            {isSignInForm ? "New to Netflix? Sign Up Now" : "Already regestered SignIn Now"}
          </p>


      </form>
        
    </div>

  )
}

export default Login;
