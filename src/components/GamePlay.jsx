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

  const getPromptColor = () => {
    if (promptType === 'truth') return 'bg-gradient-to-r from-blue-500 to-purple-600'
    if (promptType === 'dare') return 'bg-gradient-to-r from-pink-500 to-rose-600'
    return 'bg-gradient-to-r from-purple-500 to-violet-600'
  }

  return (
    <div className="min-h-screen pb-24">
      <Header currentUser={currentUser} currentTurn={gameState?.current_turn} />

      <div className="max-w-lg mx-auto px-6 pt-24">
        {isMyTurn && (
          <motion.button
            onClick={() => setShowSpin(true)}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="relative w-full py-5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold text-lg shadow-2xl mb-8 disabled:opacity-50 overflow-hidden"
            style={{ boxShadow: '0 8px 32px rgba(168, 85, 247, 0.5)' }}
          >
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <span className="relative z-10">Spin</span>
          </motion.button>
        )}

        {hasPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/8 backdrop-blur-xl rounded-3xl p-8 border border-white/10 mb-6"
            style={{ boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3)' }}
          >
            <div className={`inline-block px-4 py-1.5 rounded-full text-white text-xs font-bold mb-4 ${getPromptColor()}`}>
              {promptType?.toUpperCase() || 'QUESTION'}
            </div>

            <p className="text-white text-xl leading-relaxed mb-6">
              {gameState.current_prompt_text}
            </p>

            {isMyTurn && (
              <div className="space-y-4">
                {promptType === 'dare' ? (
                  <motion.button
                    onClick={() => {
                      setDareCompleted(true)
                      handleSubmit()
                    }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
                      dareCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-white/10 border-2 border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    {dareCompleted ? '✓ Done!' : 'Done?'}
                  </motion.button>
                ) : (
                  <>
                    <textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Type your answer..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-purple-400/50 focus:bg-white/8 resize-none"
                      rows="4"
                    />
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!response.trim() || isLoading}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold disabled:opacity-40"
                    >
                      Submit
                    </motion.button>
                  </>
                )}
              </div>
            )}

            {!isMyTurn && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center py-4"
              >
                <p className="text-white/60">Waiting for {gameState.current_turn}...</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {!hasPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mx-auto mb-6"
            />
            <p className="text-white/40">Tap spin to start the game</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showSpin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setShowSpin(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm"
            >
              <div className="text-center mb-8">
                <h2 className="text-white text-2xl font-bold mb-2">
                  Spin the Wheel
                </h2>
                <p className="text-white/60 text-sm">
                  Get a random prompt
                </p>
              </div>
              
              <SpinWheel onResult={handleSpin} />

              <motion.button
                onClick={() => setShowSpin(false)}
                whileTap={{ scale: 0.95 }}
                className="mt-8 w-full py-3 rounded-full bg-white/10 border border-white/20 text-white/80 font-medium"
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white"
          />
        </motion.div>
      )}
    </div>
  )
}
