import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MessageCard from '../components/MessageCard'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Dashboard() {
  const nav = useNavigate()
  const [msgs, setMsgs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const t = localStorage.getItem('token')
    const u = localStorage.getItem('user')
    if (!t || !u) return nav('/')
    setUser(JSON.parse(u))
    fetch(API + '/api/messages', { headers: { Authorization: 'Bearer ' + t } })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) return
        setMsgs(d.msgs || [])
      })
  }, [])

  if (!user) return null

  const shareUrl = window.location.origin + '/send/' + user.linkId

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/70 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-xl relative z-10"
      >
        {/* User info + share link */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-rose-600">
              Hello, {user.username} 👋
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Share your unique link to receive anonymous secret messages:
            </p>

            <div className="mt-3 flex items-center gap-2">
              <input
                readOnly
                value={shareUrl}
                className="flex-1 p-3 rounded-xl border text-sm shadow-sm focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium shadow-md hover:shadow-lg transition"
              >
                Copy
              </motion.button>
            </div>
          </div>
        </div>

        {/* Messages section */}
        <div className="mt-10">
          <h4 className="text-lg font-semibold text-slate-800 mb-4">
            📩 Your Messages
          </h4>

          {msgs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-slate-500 text-center py-8 bg-slate-50 rounded-xl"
            >
              No messages yet — share your link and let the fun begin!
            </motion.div>
          )}

          <div className="grid gap-4 mt-4">
            {msgs.map((m, i) => (
              <motion.div
                key={m._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <MessageCard m={m} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
