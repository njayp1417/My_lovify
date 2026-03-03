import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/gameStore'
import Header from './Header'
import SpinWheel from './SpinWheel'

export default function GamePlay() {
  const { currentUser, gameState, spin, submitResponse, isLoading } = useStore()
  const [showSpin, setShowSpin] = useState(false)
  const [response, setResponse] = useState('')
  const [dareCompleted, setDareCompleted] = useState(false)

  const isMyTurn = gameState?.current_turn === currentUser
  const hasPrompt = gameState?.current_prompt_text
  const promptType = gameState?.current_prompt_type

  const handleSpin = async () => {
    await spin()
    setShowSpin(false)
  }

  const handleSubmit = async () => {
    if (promptType === 'dare') {
      await submitResponse('Completed')
      setDareCompleted(false)
    } else {
      if (!response.trim()) return
      await submitResponse(response)
      setResponse('')
    }
  }

  return (
    <div className="min-h-screen pb-24">
      <Header currentUser={currentUser} currentTurn={gameState?.current_turn} />

      <div className="max-w-lg mx-auto px-6 pt-24">
        {/* Spin Button - Always visible */}
        {isMyTurn && (
          <motion.button
            onClick={() => setShowSpin(true)}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full py-5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold text-lg shadow-2xl mb-8 disabled:opacity-50"
            style={{
              boxShadow: '0 8px 32px rgba(168, 85, 247, 0.5)'
            }}
          >
            <motion.div
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <span className="relative z-10">Spin</span>
          </motion.button>
        )}

        {/* Current Prompt */}
        {hasPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/8 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-6"
            style={{
              boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3)'
            }}
          >
            <div className={`inline-block px-4 py-1.5 rounded-full text-white text-xs font-bold mb-4 ${\n              promptType === 'truth' \n                ? 'bg-gradient-to-r from-blue-500 to-purple-600'\n                : promptType === 'dare'\n                ? 'bg-gradient-to-r from-pink-500 to-rose-600'\n                : 'bg-gradient-to-r from-purple-500 to-violet-600'\n            }`}>\n              {promptType?.toUpperCase() || 'QUESTION'}\n            </div>\n\n            <p className=\"text-white text-xl leading-relaxed mb-6\">\n              {gameState.current_prompt_text}\n            </p>\n\n            {/* Response Section - Only for person whose turn it is */}\n            {isMyTurn && (\n              <div className=\"space-y-4\">\n                {promptType === 'dare' ? (\n                  <motion.button\n                    onClick={() => {\n                      setDareCompleted(true)\n                      handleSubmit()\n                    }}\n                    whileTap={{ scale: 0.98 }}\n                    disabled={isLoading}\n                    className={`w-full py-4 rounded-full font-bold text-lg transition-all ${\n                      dareCompleted\n                        ? 'bg-green-500 text-white'\n                        : 'bg-white/10 border-2 border-white/20 text-white hover:bg-white/20'\n                    }`}\n                  >\n                    {dareCompleted ? '✓ Done!' : 'Done?'}\n                  </motion.button>\n                ) : (\n                  <>\n                    <textarea\n                      value={response}\n                      onChange={(e) => setResponse(e.target.value)}\n                      placeholder=\"Type your answer...\"\n                      className=\"w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-purple-400/50 focus:bg-white/8 resize-none\"\n                      rows=\"4\"\n                    />\n                    <motion.button\n                      onClick={handleSubmit}\n                      disabled={!response.trim() || isLoading}\n                      whileTap={{ scale: 0.98 }}\n                      className=\"w-full py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold disabled:opacity-40\"\n                    >\n                      Submit\n                    </motion.button>\n                  </>\n                )}\n              </div>\n            )}\n\n            {/* Waiting message for other player */}\n            {!isMyTurn && (\n              <motion.div\n                animate={{ opacity: [0.5, 1, 0.5] }}\n                transition={{ duration: 2, repeat: Infinity }}\n                className=\"text-center py-4\"\n              >\n                <p className=\"text-white/60\">Waiting for {gameState.current_turn}...</p>\n              </motion.div>\n            )}\n          </motion.div>\n        )}\n\n        {/* Empty State */}\n        {!hasPrompt && (\n          <motion.div\n            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            className=\"text-center py-16\"\n          >\n            <motion.div\n              animate={{\n                scale: [1, 1.05, 1],\n                opacity: [0.3, 0.5, 0.3]\n              }}\n              transition={{\n                duration: 3,\n                repeat: Infinity\n              }}\n              className=\"w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mx-auto mb-6\"\n            />\n            <p className=\"text-white/40\">Tap spin to start the game</p>\n          </motion.div>\n        )}\n      </div>\n\n      {/* Spin Modal */}\n      <AnimatePresence>\n        {showSpin && (\n          <motion.div\n            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            className=\"fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl\"\n            onClick={() => setShowSpin(false)}\n          >\n            <motion.div\n              initial={{ scale: 0.8, opacity: 0 }}\n              animate={{ scale: 1, opacity: 1 }}\n              exit={{ scale: 0.8, opacity: 0 }}\n              onClick={(e) => e.stopPropagation()}\n              className=\"w-full max-w-sm\"\n            >\n              <div className=\"text-center mb-8\">\n                <h2 className=\"text-white text-2xl font-bold mb-2\">\n                  Spin the Wheel\n                </h2>\n                <p className=\"text-white/60 text-sm\">\n                  Get a random prompt\n                </p>\n              </div>\n              \n              <SpinWheel onResult={handleSpin} />\n\n              <motion.button\n                onClick={() => setShowSpin(false)}\n                whileTap={{ scale: 0.95 }}\n                className=\"mt-8 w-full py-3 rounded-full bg-white/10 border border-white/20 text-white/80 font-medium\"\n              >\n                Cancel\n              </motion.button>\n            </motion.div>\n          </motion.div>\n        )}\n      </AnimatePresence>\n\n      {/* Loading Overlay */}\n      {isLoading && (\n        <motion.div\n          initial={{ opacity: 0 }}\n          animate={{ opacity: 1 }}\n          className=\"fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm\"\n        >\n          <motion.div\n            animate={{ rotate: 360 }}\n            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}\n            className=\"w-12 h-12 rounded-full border-4 border-white/20 border-t-white\"\n          />\n        </motion.div>\n      )}\n    </div>\n  )\n}
