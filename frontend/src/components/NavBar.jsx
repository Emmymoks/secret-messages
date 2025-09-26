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
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={{
            open: { opacity: 1, height: 'auto', transition: { stiffness: 20 } },
            closed: { opacity: 0, height: 0, transition: { stiffness: 20 } }
          }}
          className='md:hidden mobile-menu'
        >
          <div className='px-4 py-4 flex flex-col gap-3'>
            <Link to='/' onClick={()=>setOpen(false)} className='mobile-link'>Home</Link>
            {user ? (
              <>
                <Link to='/dashboard' onClick={()=>setOpen(false)} className='mobile-link'>Dashboard</Link>
                <button onClick={()=>{ setOpen(false); doLogout(); }} className='mobile-link text-left'>Logout</button>
              </>
            ) : (
              <>
                <Link to='/register' onClick={()=>setOpen(false)} className='mobile-link'>Get your link</Link>
                <Link to='/login' onClick={()=>setOpen(false)} className='mobile-link'>Login</Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
