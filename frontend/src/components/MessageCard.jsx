import React from 'react'
import { motion } from 'framer-motion'

export default function MessageCard({ m }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-pink-100 shadow-md hover:shadow-lg transition"
    >
      {/* Sender */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-rose-600">
          {m.fromName || 'Anonymous'}
        </span>
        <span className="px-2 py-0.5 text-xs rounded-full bg-rose-100 text-rose-600">
          sender
        </span>
      </div>

      {/* Body */}
      <div className="relative bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl shadow-inner text-slate-700">
        {m.body}
      </div>

      {/* Date */}
      <div className="text-xs text-slate-400 italic mt-3">
        {new Date(m.createdAt).toLocaleString()}
      </div>
    </motion.div>
  )
}
