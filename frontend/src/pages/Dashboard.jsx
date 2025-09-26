import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../utils/auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import FloatingShapes from '../components/FloatingShapes'

export default function Dashboard(){
  const { user, token, setUser, setToken } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const nav = useNavigate();

  useEffect(()=>{
    if(!user) return nav('/login');
    async function load(){
      try{
        const res = await axios.get(import.meta.env.VITE_API_URL + '/api/messages/my', { headers: { Authorization: 'Bearer ' + token } });
        setMessages(res.data.messages);
      } catch(err){ console.error(err); }
    }
    load();
  }, [user]);

  function logout(){ setUser(null); setToken(null); nav('/'); }

  return (
    <div className='min-h-screen relative'>
      <FloatingShapes />
      <div className='max-w-4xl mx-auto p-6'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <h1 className='text-2xl font-bold'>Hi, {user?.username}</h1>
            <p className='text-sm text-gray-500'>Your unique link to receive messages:</p>
            <code className='block mt-2 bg-white/80 p-2 rounded'>{window.location.origin}/send/{user?.id}</code>
          </div>
          <div className='space-x-2'>
            <button onClick={logout} className='px-4 py-2 rounded-lg border'>Logout</button>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {messages.length === 0 && <div className='card'>No messages yet — share your link!</div>}
          {messages.map(m => (
            <div key={m._id} className='card'>
              <div className='text-sm text-gray-500'>From: {m.fromName}</div>
              <div className='mt-2 whitespace-pre-wrap'>{m.content}</div>
              <div className='text-xs text-gray-400 mt-3'>{new Date(m.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
