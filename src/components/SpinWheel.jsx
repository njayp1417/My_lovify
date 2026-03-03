import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function SpinWheel({ onResult }) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState(null)

  const types = [
    { name: 'truth', color: 'from-blue-500 to-purple-600' },
    { name: 'dare', color: 'from-pink-500 to-rose-600' },
    { name: 'challenge', color: 'from-purple-500 to-violet-600' }
  ]

  const handleSpin = async () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setResult(null)

    // Simulate spin delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const selected = types[Math.floor(Math.random() * types.length)]
    setResult(selected)

    // Show result then callback
    setTimeout(() => {
      onResult(selected.name)
      setIsSpinning(false)
      setResult(null)
    }, 2000)
  }

  return (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!isSpinning && !result ? (
          <motion.button
            key="button"
            onClick={handleSpin}
            whileTap={{ scale: 0.95 }}
            className="relative w-56 h-56 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 blur-2xl"
            />
            
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center shadow-2xl">
              <div className="w-[90%] h-[90%] rounded-full bg-gradient-to-br from-purple-900/90 to-black/90 backdrop-blur-xl flex items-center justify-center border border-white/10">
                <span className="text-white text-3xl font-bold">Spin</span>
              </div>
            </div>
          </motion.button>
        ) : isSpinning ? (
          <motion.div
            key="spinning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-56 h-56"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="w-full h-full rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #3b82f6, #ec4899, #a855f7, #3b82f6)'
              }}
            />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-900/90 to-black/90 backdrop-blur-xl flex items-center justify-center">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-white text-2xl font-bold"
              >
                Spinning...
              </motion.span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="relative w-56 h-56"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 0.5 }}
              className={`w-full h-full rounded-full bg-gradient-to-br ${result.color} flex items-center justify-center shadow-2xl`}
            >
              <div className="w-[85%] h-[85%] rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <span className="text-white text-2xl font-bold uppercase tracking-wider">
                  {result.name}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
