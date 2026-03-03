import { motion } from 'framer-motion'

export default function GameSelection({ onSelectGame }) {
  const games = [
    {
      id: 'truth-or-dare',
      title: 'Truth or Dare',
      description: 'From baby to wild levels',
      gradient: 'from-pink-500 via-rose-500 to-purple-600'
    },
    {
      id: 'would-you-rather',
      title: 'Would You Rather',
      description: 'Impossible choices',
      gradient: 'from-blue-500 via-purple-500 to-violet-600'
    }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <motion.div className="text-center mb-10">
          <h1 className="text-white text-3xl font-bold mb-2">Choose Your Game</h1>
          <p className="text-white/50 text-sm">Pick one to start playing</p>
        </motion.div>

        <div className="space-y-4">
          {games.map((game, idx) => (
            <motion.button
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full p-6 rounded-3xl bg-gradient-to-r ${game.gradient} text-white text-left relative overflow-hidden group`}
              style={{
                boxShadow: '0 8px 32px rgba(168, 85, 247, 0.4)'
              }}
            >
              <motion.div
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-1">{game.title}</h2>
                <p className="text-white/80 text-sm">{game.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
