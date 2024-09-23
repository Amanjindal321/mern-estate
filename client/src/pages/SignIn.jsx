import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice.js'
import OAuth from '../components/OAuth.jsx';

const SignIn = () => {
 
const [formData, setFormData]=useState({});

const {loading, error}= useSelector((state)=>state.user);

// const [error, setError]=useState(null);
// const [loading, setLoading]=useState(false);

  const navigate=useNavigate();

  const dispatch=useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })

  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    // setLoading(true);
    try {
      dispatch(signInStart());
      const res=await fetch('/api/auth/signin', {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data=await res.json();
      if(data.success===false){
        // setError(data.message);
        // setLoading(false);
        dispatch(signInFailure(data.message)); // redux correction
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data)); // redux correction
      navigate('/');
      // console.log(data)

    } catch (error){
      // setLoading(false);
      // setError(error.message)
      // console.log(error)
      dispatch(signInFailure(error.message)); // redux correction
    }
  }
  console.log(formData)
  return (
    <div className='max-w-lg mx-auto mt-10'>
      <h1 className='text-3xl font-semibold p-3 text-center'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
       
        <input className='border p-3 rounded-lg' type='text' placeholder='Email' id='email' onChange={handleChange}/>
        <input className='border p-3 rounded-lg' type='text' placeholder='Password' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-75'>{loading?'Loading...':'SignIn'}</button>
        <OAuth />
      </form>
      <div className='mt-3 gap-3 flex'>
       Don't Have an Account?
        <span ><Link to='/sign-up' className='text-blue-700'>Sign Up</Link></span>
      </div>
      {
        error && <p className='text-red-500 mt-5'>{error}</p>
      }
    </div>
  )
}

export default SignIn