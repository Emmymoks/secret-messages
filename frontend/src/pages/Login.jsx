import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../utils/auth'

export default function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken } = useContext(AuthContext);
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const res = await axios.post(import.meta.env.VITE_API_URL + '/api/auth/login', { username, password });
      setUser(res.data.user);
      setToken(res.data.token);
      nav('/dashboard');
    } catch(err){
      alert(err?.response?.data?.message || 'Error');
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center relative'>
      <div className='card w-full max-w-md fade-in'>
        <h2 className='text-2xl font-semibold mb-4'>Welcome back</h2>
        <form onSubmit={submit} className='space-y-3'>
          <input className='w-full p-3 rounded-lg border' placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)} />
          <input className='w-full p-3 rounded-lg border' placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} />
          <button className='w-full py-3 rounded-full bg-gradient-to-r from-softpink to-coral text-white'>Login</button>
        </form>
      </div>
    </div>
  )
}
