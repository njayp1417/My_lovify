import { motion } from 'framer-motion'
import { useStore } from '../store/gameStore'

export default function ChallengesBanner() {
  const { challenges } = useStore()
  
  if (!challenges || challenges.length === 0) return null

  const activeChallenge = challenges.find(c => !c.completed)
  if (!activeChallenge) return null

  const progress = (activeChallenge.current_count / activeChallenge.goal_count) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-6 mb-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-4 border border-purple-400/30"
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-white font-bold text-sm">{activeChallenge.title}</h3>
          <p className="text-white/60 text-xs">{activeChallenge.description}</p>
        </div>
        <div className="text-right">
          <p className="text-white font-bold text-lg">
            {activeChallenge.current_count}/{activeChallenge.goal_count}
          </p>
        </div>
      </div>
      
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
        />
      </div>
    </motion.div>
  )
}
