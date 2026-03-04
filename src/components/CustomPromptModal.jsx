import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../store/gameStore'

export default function CustomPromptModal({ onClose, gameType }) {
  const { addCustomPrompt, isLoading } = useStore()
  const [content, setContent] = useState('')
  const [promptType, setPromptType] = useState(gameType === 'truth-or-dare' ? 'truth' : null)
  const [difficulty, setDifficulty] = useState('baby')

  const handleSubmit = async () => {
    if (!content.trim()) return
    await addCustomPrompt({
      game_type: gameType,
      prompt_type: promptType,
      content: content.trim(),
      difficulty,
      is_custom: true
    })
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20"
      >
        <h2 className="text-white text-2xl font-bold mb-4">Create Custom Prompt</h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your custom question..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-purple-400/50 resize-none mb-4"
          rows="4"
        />

        {gameType === 'truth-or-dare' && (
          <div className="mb-4">
            <label className="text-white/60 text-sm mb-2 block">Type</label>
            <div className="flex gap-2">
              {['truth', 'dare'].map((type) => (
                <button
                  key={type}
                  onClick={() => setPromptType(type)}
                  className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                    promptType === type
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 text-white/60'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="text-white/60 text-sm mb-2 block">Difficulty</label>
          <div className="grid grid-cols-4 gap-2">
            {['baby', 'medium', 'wild', 'drunk'].map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`py-2 rounded-full text-xs font-medium transition-all ${
                  difficulty === level
                    ? 'bg-pink-500 text-white'
                    : 'bg-white/5 text-white/60'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <motion.button
            onClick={onClose}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3 rounded-full bg-white/10 text-white/80 font-medium"
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={handleSubmit}
            disabled={!content.trim() || isLoading}
            whileTap={{ scale: 0.95 }}
            className="flex-1 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold disabled:opacity-40"
          >
            Create
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
