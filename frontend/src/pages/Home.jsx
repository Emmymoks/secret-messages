import React from 'react'
import { Link } from 'react-router-dom'
import FloatingShapes from '../components/FloatingShapes'
import { motion } from 'framer-motion'

export default function Home(){
  return (
    <div className='min-h-screen flex items-center justify-center relative'>
      <FloatingShapes />
      <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className='card max-w-2xl w-full text-center'>
        <h1 className='text-3xl font-bold mb-2'>Secret Messages</h1>
        <p className='mb-6'>Get a unique link. Friends can send you secret messages — no sign up required to send.</p>
        <div className='flex gap-3 justify-center'>
          <Link to='/register' className='px-6 py-2 rounded-full bg-gradient-to-r from-softpink to-coral text-white shadow-md'>Get your link</Link>
          <Link to='/login' className='px-6 py-2 rounded-full border border-gray-200'>Already have an account</Link>
        </div>
      </motion.div>
    </div>
  )
}
