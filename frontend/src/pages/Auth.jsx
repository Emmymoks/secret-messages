import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [err, setErr] = useState('')
  const nav = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    const url = isRegister ? '/api/auth/register' : '/api/auth/login'
    const res = await fetch(API + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if (data.error) return setErr(data.error)
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    nav('/dashboard')
  }

  return (
    <div className="flex items-center justify-center py-16 px-4 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md rounded-3xl shadow-xl bg-white/70 backdrop-blur-lg border border-white/20 p-8 relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold mb-3 text-center text-rose-600"
        >
          Secret Messages
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-slate-600 mb-6 text-center"
        >
          Send & receive anonymous messages from friends. Share your unique link
          and start connecting.
        </motion.p>

        {err && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-600 mb-4 text-center"
          >
            {err}
          </motion.div>
        )}

        <form onSubmit={submit} className="space-y-4">
          {/* Username */}
          <motion.input
            whileFocus={{ scale: 1.02 }}
            className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-rose-400 focus:outline-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password with toggle */}
          <div className="relative">
            <motion.input
              type={showPassword ? 'text' : 'password'}
              whileFocus={{ scale: 1.02 }}
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-rose-400 focus:outline-none pr-10"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full p-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium shadow-md hover:shadow-lg transition"
          >
            {isRegister ? 'Create account' : 'Login'}
          </motion.button>
        </form>

        {/* Switch between login/register */}
        <div className="text-sm text-center mt-6">
          <button
            className="underline text-rose-600 hover:text-rose-700 transition"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? 'Already have an account? Login'
              : "Don’t have an account? Register"}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
