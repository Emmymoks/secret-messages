import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import SendMessage from './pages/SendMessage'

export default function App() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50">
      {/* Floating 3D background shapes */}
      <div className="floating-shape heart" style={{ top: '10%', left: '5%' }}></div>
      <div className="floating-shape red-heart" style={{ bottom: '15%', right: '10%' }}></div>
      <div className="floating-shape diamond" style={{ top: '40%', right: '20%' }}></div>
      <div className="floating-shape heart" style={{ bottom: '20%', left: '15%' }}></div>

      {/* Page content with transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Auth />
              </PageWrapper>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PageWrapper>
                <Dashboard />
              </PageWrapper>
            }
          />
          <Route
            path="/send/:linkId"
            element={
              <PageWrapper>
                <SendMessage />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

/**
 * Wraps each page with entry/exit animations
 */
function PageWrapper({ children }) {
  return (
    <motion.div
      className="relative z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
