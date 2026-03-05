import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../store/gameStore'
import Header from './Header'
import SpinWheel from './SpinWheel'
import LoadingSkeleton from './LoadingSkeleton'
import ChallengesBanner from './ChallengesBanner'
import confetti from 'canvas-confetti'
import { requestNotificationPermission, notifyTurnChange, notifyAnswer } from '../utils/notifications'
import DebugGameState from './DebugGameState'

export default function GamePlay() {
  const { currentUser, gameState, spin, submitResponse, clearRound, isLoading, loadChallenges, updateChallengeProgress, resetToGameSelection } = useStore()
  const [showSpin, setShowSpin] = useState(false)
  const [response, setResponse] = useState('')
  const [dareCompleted, setDareCompleted] = useState(false)
  const [liked, setLiked] = useState(false)
  const lastTap = useRef(0)
  const prevTurn = useRef(gameState?.current_turn)

  useEffect(() => {
    requestNotificationPermission()
    loadChallenges()
  }, [])

  useEffect(() => {
    if (gameState?.current_turn && prevTurn.current && prevTurn.current !== gameState.current_turn) {
      if (gameState.current_turn === currentUser) {
        notifyTurnChange(prevTurn.current)
      } else {
        notifyAnswer()
      }
    }
    prevTurn.current = gameState?.current_turn
  }, [gameState?.current_turn, currentUser])

  const isMyTurn = gameState?.current_turn === currentUser
  const hasPrompt = gameState?.current_prompt_text
  const promptType = gameState?.current_prompt_type
  // Fallback logic: if asked_by doesn't exist, assume the person who is NOT current_turn asked
  const askedByMe = gameState?.asked_by ? 
    gameState.asked_by === currentUser : 
    (hasPrompt && gameState?.current_turn !== currentUser)
  const hasResponse = gameState?.last_response

  const handleSpin = async () => {
    await spin()
    setShowSpin(false)
  }

  const handleSubmit = async () => {
    if (promptType === 'dare') {
      await submitResponse('Completed')
      setDareCompleted(false)
      triggerConfetti()
    } else {
      if (!response.trim()) return
      await submitResponse(response)
      setResponse('')
    }
    updateChallengeProgress()
  }

  const triggerConfetti = () => {
    const difficulty = gameState?.current_prompt_difficulty
    if (difficulty === 'wild' || difficulty === 'drunk') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#a855f7', '#f43f5e']
      })
    }
  }

  const handleDoubleTap = () => {
    const now = Date.now()
    const DOUBLE_TAP_DELAY = 300
    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      setLiked(true)
      setTimeout(() => setLiked(false), 1000)
    }
    lastTap.current = now
  }

  const getPromptColor = () => {
    if (promptType === 'truth') return 'bg-gradient-to-r from-blue-500 to-purple-600'
    if (promptType === 'dare') return 'bg-gradient-to-r from-pink-500 to-rose-600'
    return 'bg-gradient-to-r from-purple-500 to-violet-600'
  }

  return (
    <div className="min-h-screen pb-24">
      <DebugGameState />
      <Header 
        currentUser={currentUser} 
        currentTurn={gameState?.current_turn}
        onBackToMenu={resetToGameSelection}
      />

      <div className="max-w-lg mx-auto px-6 pt-24">
        <ChallengesBanner />
        
        {/* Show spin button only when it's my turn AND no active prompt */}
        {isMyTurn && !hasPrompt && (
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

        {/* Show prompt card when there's an active prompt */}
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

            <div 
              className="relative"
              onClick={handleDoubleTap}
            >
              <p className="text-white text-xl leading-relaxed mb-6">
                {gameState.current_prompt_text}
              </p>
              <AnimatePresence>
                {liked && (
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <span className="text-6xl">❤️</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Show response area if there's an answer */}
            {hasResponse && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-4"
              >
                <p className="text-white/60 text-sm mb-2">Answer:</p>
                <p className="text-white text-lg">{gameState.last_response}</p>
              </motion.div>
            )}

            {/* Input section - only for person who needs to answer */}
            {isMyTurn && !askedByMe && !hasResponse && (
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

            {/* Waiting message for person who asked */}
            {askedByMe && !hasResponse && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center py-4"
              >
                <p className="text-white/60">Waiting for {gameState.current_turn} to answer...</p>
              </motion.div>
            )}

            {/* OK button for person who asked (after getting answer) */}
            {askedByMe && hasResponse && (
              <motion.button
                onClick={clearRound}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold"
              >
                OK
              </motion.button>
            )}

            {/* Waiting for OK message for person who answered */}
            {!askedByMe && hasResponse && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center py-4"
              >
                <p className="text-white/60">Waiting for {gameState.asked_by} to continue...</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Show default state when no prompt and not my turn */}
        {!hasPrompt && !isMyTurn && (
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
            <p className="text-white/40">Waiting for {gameState?.current_turn || 'partner'} to spin...</p>
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

      {isLoading && <LoadingSkeleton />}
    </div>
  )
}