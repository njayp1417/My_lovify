import { motion } from 'framer-motion'

export default function Header({ currentUser, pendingCount }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-2xl border-b border-white/10"
    >
      <div className="max-w-lg mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{
                scale: currentUser === 'Nelson' ? [1, 1.3, 1] : 1,
                opacity: currentUser === 'Nelson' ? [0.5, 1, 0.5] : 0.4
              }}
              transition={{
                duration: 2,
                repeat: currentUser === 'Nelson' ? Infinity : 0
              }}
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
              style={{
                boxShadow: currentUser === 'Nelson' ? '0 0 12px rgba(147, 51, 234, 0.6)' : 'none'
              }}
            />
            <span className={`font-semibold text-sm ${
              currentUser === 'Nelson' ? 'text-white' : 'text-white/50'
            }`}>
              Nelson
            </span>
          </div>

          <div className="relative">
            <span className="text-white/60 text-lg">❤️</span>
            {pendingCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center"
              >
                <span className="text-white text-[10px] font-bold">{pendingCount}</span>
              </motion.div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <span className={`font-semibold text-sm ${
              currentUser === 'Nifemi' ? 'text-white' : 'text-white/50'
            }`}>
              Nifemi
            </span>
            <motion.div
              animate={{
                scale: currentUser === 'Nifemi' ? [1, 1.3, 1] : 1,
                opacity: currentUser === 'Nifemi' ? [0.5, 1, 0.5] : 0.4
              }}
              transition={{
                duration: 2,
                repeat: currentUser === 'Nifemi' ? Infinity : 0
              }}
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-400 to-rose-500"
              style={{
                boxShadow: currentUser === 'Nifemi' ? '0 0 12px rgba(236, 72, 153, 0.6)' : 'none'
              }}
            />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
