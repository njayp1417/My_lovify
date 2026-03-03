import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Login({ onLogin }) {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <motion.div
          className="text-center mb-10"
        >
          <motion.h1 
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="text-5xl font-bold mb-3"
            style={{
              background: 'linear-gradient(90deg, #ec4899, #a855f7, #3b82f6, #ec4899)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Nelson ❤️ Nifemi
          </motion.h1>
          <p className="text-white/50 text-sm">Your private game space</p>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 space-y-5 shadow-2xl">
          <h2 className="text-white text-xl font-bold text-center mb-6">
            Who's playing?
          </h2>

          {['Nelson', 'Nifemi'].map((name, idx) => (
            <motion.button
              key={name}
              onClick={() => setSelected(name)}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`w-full p-5 rounded-2xl font-semibold text-lg transition-all relative overflow-hidden ${
                selected === name
                  ? name === 'Nelson'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                  : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80'
              }`}
              style={{
                boxShadow: selected === name 
                  ? name === 'Nelson'
                    ? '0 8px 24px rgba(147, 51, 234, 0.4)'
                    : '0 8px 24px rgba(236, 72, 153, 0.4)'
                  : 'none'
              }}
            >
              {name}
            </motion.button>
          ))}

          <motion.button
            onClick={() => selected && onLogin(selected)}
            disabled={!selected}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed mt-8 shadow-xl"
            style={{
              boxShadow: selected ? '0 8px 32px rgba(168, 85, 247, 0.5)' : 'none'
            }}
          >
            Enter
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
