import { motion } from 'framer-motion'

export default function Header({ currentUser, currentTurn }) {
  const players = [
    { name: 'Nelson', image: '/nelson.jpg', gradient: 'from-blue-400 to-purple-500' },
    { name: 'Nifemi', image: '/nifemi.jpg', gradient: 'from-pink-400 to-rose-500' }
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-2xl border-b border-white/10"
    >
      <div className="max-w-lg mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {players.map((player) => {
            const isActive = currentTurn === player.name
            const isCurrentUser = currentUser === player.name
            
            return (
              <div key={player.name} className="flex items-center space-x-3">
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: isActive ? [1, 1.1, 1] : 1,
                      opacity: isActive ? [0.6, 1, 0.6] : 0.3
                    }}
                    transition={{
                      duration: 2,
                      repeat: isActive ? Infinity : 0
                    }}
                    className={`absolute -inset-1 rounded-full bg-gradient-to-r ${player.gradient} blur-md`}
                  />
                  <img
                    src={player.image}
                    alt={player.name}
                    className="relative w-12 h-12 rounded-full object-cover border-2 border-white/20"
                  />
                  {isActive && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-black"
                    />
                  )}
                </div>
                <div>
                  <p className={`font-semibold text-sm ${
                    isCurrentUser ? 'text-white' : 'text-white/50'
                  }`}>
                    {player.name}
                  </p>
                  {isActive && (
                    <p className="text-green-400 text-xs">Their turn</p>
                  )}
                </div>
              </div>
            )
          })}

          <div className="absolute left-1/2 -translate-x-1/2">
            <span className="text-white/60 text-lg">❤️</span>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
