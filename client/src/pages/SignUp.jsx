import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';///////correctionnn
import debounce from 'lodash.debounce'; // correction

const SignUp = () => {
const [formData, setFormData]=useState({});
const [error, setError]=useState(null);
const [loading, setLoading]=useState(false);

const [usernameAvailable, setUsernameAvailable]=useState(true); // correction

  const navigate=useNavigate();

// correction
const checkUsernameAvailability = useCallback(debounce(async (username) => {
  if (!username) {
      setUsernameAvailable(true);
      return;
  }
  try {
      const res = await fetch(`/api/auth/check-username?username=${username}`);
      const data = await res.json();
      setUsernameAvailable(data.available);
  } catch (error) {
      console.error(error);
  }
}, 500), []);

useEffect(() => {
  if (formData.username) {
      checkUsernameAvailability(formData.username);
  }
}, [formData.username, checkUsernameAvailability]);

/// above correction

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })

  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const res=await fetch('/api/auth/signup', {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      });
      const data=await res.json();
      if(data.success===false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
      console.log(data)
    } catch (error){
      setLoading(false);
      setError(error.message)
      console.log(error)
    }
  }
  console.log(formData)
  return (
    <div className='max-w-lg mx-auto mt-10'>
      <h1 className='text-3xl font-semibold p-3 text-center'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input className='border p-3 rounded-lg' type='text' placeholder='Username' id='username' onChange={handleChange}/>

        {!usernameAvailable && <p className='text-green-500'>Username Already exist</p>}   

        <input className='border p-3 rounded-lg' type='text' placeholder='Email' id='email' onChange={handleChange}/>
        <input className='border p-3 rounded-lg' type='text' placeholder='Password' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-75'>{loading?'Loading...':'Sign Up'}</button>
        <OAuth />
      </form>
      <div className='mt-3 gap-3 flex'>
        Have an Account?
        <span ><Link to='/sign-in' className='text-blue-700'>Sign In</Link></span>
      </div>
      {
        error && <p className='text-red-500 mt-5'>{error}</p>
      }
    </div>
  )
}

export default SignUp