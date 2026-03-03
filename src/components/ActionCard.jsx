import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ActionCard({ action, isForMe, onComplete }) {
  const [response, setResponse] = useState('')
  const [isExpanded, setIsExpanded] = useState(action.status === 'pending' && isForMe)

  const typeConfig = {
    truth: { 
      gradient: 'from-blue-500 to-purple-600',
      glow: 'rgba(59, 130, 246, 0.3)'
    },
    dare: { 
      gradient: 'from-pink-500 to-rose-600',
      glow: 'rgba(236, 72, 153, 0.3)'
    },
    challenge: { 
      gradient: 'from-purple-500 to-violet-600',
      glow: 'rgba(147, 51, 234, 0.3)'
    }
  }

  const config = typeConfig[action.type]
  const isPending = action.status === 'pending'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative rounded-3xl overflow-hidden ${
        isPending && isForMe ? 'bg-white/8' : 'bg-white/4'
      } backdrop-blur-xl border border-white/10`}
      style={{
        boxShadow: isPending && isForMe 
          ? `0 8px 32px ${config.glow}, 0 0 0 1px rgba(255,255,255,0.1) inset`
          : '0 4px 16px rgba(0, 0, 0, 0.2)'
      }}
    >
      {isPending && isForMe && (
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
        />
      )}

      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${config.gradient} text-white text-xs font-bold tracking-wide`}>
            {action.type.toUpperCase()}
          </div>
          
          {isPending && isForMe && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
            />
          )}
        </div>

        <p className="text-white/90 text-lg leading-relaxed mb-4">
          {action.content}
        </p>

        {isPending && isForMe && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="space-y-3 mt-6"
          >
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your response..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-purple-400/50 focus:bg-white/8 resize-none transition-all"
              rows="3"
            />
            <motion.button
              onClick={() => onComplete(action.id, response)}
              disabled={!response.trim()}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
            >
              Submit Response
            </motion.button>
          </motion.div>
        )}

        {action.status === 'completed' && action.response && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-wide">Response</p>
            <p className="text-white/80 leading-relaxed">{action.response}</p>
          </motion.div>
        )}

        <div className="flex items-center justify-between mt-4 text-xs text-white/40">
          <span>{isForMe ? `From ${action.from_player}` : `To ${action.to_player}`}</span>
          <span>{new Date(action.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  )
}
