import React, { useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import FloatingShapes from '../components/FloatingShapes'

export default function Send(){
  const { userId } = useParams();
  const [fromName, setFromName] = useState('');
  const [content, setContent] = useState('');
  const [sent, setSent] = useState(false);

  async function submit(e){
    e.preventDefault();
    try{
      await axios.post(import.meta.env.VITE_API_URL + '/api/messages/send/' + userId, { fromName, content });
      setSent(true);
    } catch(err){
      alert('Error sending message');
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center relative'>
      <FloatingShapes />
      <div className='card w-full max-w-lg'>
        {!sent ? (
          <form onSubmit={submit} className='space-y-3'>
            <h2 className='text-xl font-semibold'>Send a secret message</h2>
            <input className='w-full p-3 rounded-lg border' placeholder='Your name (optional)' value={fromName} onChange={e=>setFromName(e.target.value)} />
            <textarea className='w-full p-3 rounded-lg border' placeholder='Write your message...' rows={6} value={content} onChange={e=>setContent(e.target.value)} />
            <div className='flex gap-3'>
              <button className='px-4 py-2 rounded-full bg-gradient-to-r from-softpink to-coral text-white'>Send</button>
              <Link to='/' className='px-4 py-2 rounded-full border'>Home</Link>
            </div>
          </form>
        ) : (
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Sent — thank you!</h3>
            <p>Want to get your own secret link to receive messages from friends?</p>
            <Link to='/register' className='inline-block px-4 py-2 rounded-full bg-gradient-to-r from-softpink to-coral text-white'>Create an account</Link>
          </div>
        )}
      </div>
    </div>
  )
}
