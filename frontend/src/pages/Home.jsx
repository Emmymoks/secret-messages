import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FloatingShapes from '../components/FloatingShapes'
import { motion } from 'framer-motion'
import { useAuth } from '../utils/auth'

export default function Home(){
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const link = user ? `${window.location.origin}/send/${user.id}` : null;

  async function copyLink(){
    if(!link) return;
    try{
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(()=>setCopied(false), 2000);
    }catch(e){
      // fallback for environments without clipboard API
      const el = document.createElement('textarea');
      el.value = link;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(()=>setCopied(false), 2000);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center relative'>
      <FloatingShapes />
      <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className='card max-w-2xl w-full text-center'>
        <h1 className='text-3xl font-bold mb-2'>Secret Messages</h1>
        <p className='mb-6'>Get a unique link. Friends can send you secret messages — no sign up required to send.</p>

        {user ? (
          <div className='space-y-4'>
            <p className='text-sm text-gray-600'>Signed in as <strong>{user.username}</strong></p>
            <div className='flex items-center justify-center gap-3'>
              <Link to='/dashboard' className='px-6 py-2 rounded-full bg-gradient-to-r from-softpink to-coral text-white shadow-md'>Go to Dashboard</Link>
              <button onClick={copyLink} className='px-4 py-2 rounded-full border'>
                {copied ? 'Copied!' : 'Copy your link'}
              </button>
            </div>
            {link && <code className='block mt-3 bg-white/80 p-2 rounded break-words'>{link}</code>}
          </div>
        ) : (
          <div className='flex gap-3 justify-center'>
            <Link to='/register' className='px-6 py-2 rounded-full bg-gradient-to-r from-softpink to-coral text-white shadow-md'>Get your link</Link>
            <Link to='/login' className='px-6 py-2 rounded-full border border-gray-200'>Already have an account</Link>
          </div>
        )}
      </motion.div>
    </div>
  )
}
