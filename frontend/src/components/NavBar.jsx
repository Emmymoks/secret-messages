import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../utils/auth'

export default function NavBar(){
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  function doLogout(){
    logout();
    nav('/');
  }

  return (
    <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.45 }} className='w-full bg-white/70 backdrop-blur sticky top-0 z-20 shadow-sm'>
      <div className='max-w-6xl mx-auto flex items-center justify-between px-4 py-3'>
        <div className='flex items-center gap-3'>
          <Link to='/' className='text-xl font-bold tracking-tight'>Secret<span className='text-softpink'>Messages</span></Link>
        </div>

        <div className='hidden md:flex items-center gap-3'>
          <Link to='/' className='nav-link'>Home</Link>
          <Link to='/send' className='nav-link'>Send</Link>
          {user ? (
            <>
              <Link to='/dashboard' className='nav-link'>Dashboard</Link>
              <button onClick={doLogout} className='btn-ghost'>Logout</button>
            </>
          ) : (
            <>
              <Link to='/register' className='btn-primary'>Get your link</Link>
              <Link to='/login' className='btn-outline'>Login</Link>
            </>
          )}
        </div>

        <div className='md:hidden'>
          <button aria-label='Menu' onClick={()=>setOpen(s=>!s)} className='p-2 rounded-md border'>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} transition={{ type: 'spring' }} className='md:hidden border-t'>
          <div className='px-4 py-3 flex flex-col gap-2'>
            <Link to='/' onClick={()=>setOpen(false)} className='block'>Home</Link>
            <Link to='/send' onClick={()=>setOpen(false)} className='block'>Send</Link>
            {user ? (
              <>
                <Link to='/dashboard' onClick={()=>setOpen(false)} className='block'>Dashboard</Link>
                <button onClick={()=>{ setOpen(false); doLogout(); }} className='text-left'>Logout</button>
              </>
            ) : (
              <>
                <Link to='/register' onClick={()=>setOpen(false)} className='block'>Get your link</Link>
                <Link to='/login' onClick={()=>setOpen(false)} className='block'>Login</Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
