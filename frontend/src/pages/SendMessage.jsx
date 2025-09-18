import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function SendMessage() {
  const { linkId } = useParams()
  const [body, setBody] = useState('')
  const [fromName, setFromName] = useState('')
  const [status, setStatus] = useState('')
  const [recipient, setRecipient] = useState(null)

  useEffect(() => {
    // Optionally fetch recipient info; left minimal for privacy
  }, [linkId])

  const submit = async (e) => {
    e.preventDefault()
    setStatus('')
    const res = await fetch(API + '/api/messages/send/' + linkId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fromName, body })
    })
    const data = await res.json()
    if (data.error) return setStatus('❌ ' + data.error)
    setStatus('✅ Message sent! Thanks 🙂')
    setBody('')
    setTimeout(() => {
      setRecipient(true)
    }, 600)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-xl bg-white/70 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-xl z-10"
      >
        <h3 className="text-2xl font-bold text-rose-600 mb-2">
          💌 Leave a secret message
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          Your message will be delivered anonymously (unless you include your
          name).
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            value={fromName}
            onChange={(e) => setFromName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full p-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            placeholder="Write your secret message..."
            className="w-full p-3 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-medium shadow-md hover:shadow-lg transition"
            >
              Send
            </motion.button>
            {status && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-medium text-slate-600"
              >
                {status}
              </motion.div>
            )}
          </div>
        </form>

        {recipient && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-5 bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 rounded-2xl shadow-inner"
          >
            <p className="text-sm text-slate-700">
              🌟 Want your own link to receive secret messages?{' '}
              <Link
                to="/"
                className="font-medium text-rose-600 hover:underline"
              >
                Sign up
              </Link>{' '}
              — it’s free and only takes a minute!
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
