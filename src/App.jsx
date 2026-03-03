import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from './store/gameStore'
import { useRealtime } from './hooks/useRealtime'
import { getRandomPrompt } from './data/prompts'
import Login from './components/Login'
import Header from './components/Header'
import SpinWheel from './components/SpinWheel'
import ActionCard from './components/ActionCard'
import EmptyState from './components/EmptyState'

export default function App() {
  const { 
    currentUser, 
    setCurrentUser, 
    createAction, 
    completeAction,
    getPendingActions,
    getCompletedActions,
    isLoading,
    error
  } = useStore()
  
  const [showSpin, setShowSpin] = useState(false)
  
  useRealtime(currentUser)

  const otherPlayer = currentUser === 'Nelson' ? 'Nifemi' : 'Nelson'
  const pendingActions = getPendingActions()
  const completedActions = getCompletedActions()

  const handleSpinResult = async (type) => {
    const prompt = getRandomPrompt(type)
    await createAction(otherPlayer, type, prompt)
    setShowSpin(false)
  }

  const handleComplete = async (actionId, response) => {
    await completeAction(actionId, response)
  }

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />
  }

  return (
    <div className="min-h-screen pb-24">
      <Header currentUser={currentUser} pendingCount={pendingActions.length} />

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-500/90 backdrop-blur-xl text-white px-6 py-3 rounded-full text-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="max-w-lg mx-auto px-6 pt-24">
        {/* Spin Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <motion.button
            onClick={() => setShowSpin(true)}
            whileTap={{ scale: 0.98 }}
            className="w-full py-5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold text-lg shadow-2xl relative overflow-hidden"
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
            <span className="relative z-10">Create New Action</span>
          </motion.button>
        </motion.div>

        {/* Pending Actions */}
        {pendingActions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold text-lg">Pending</h2>
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold">
                {pendingActions.length}
              </div>
            </div>
            <div className="space-y-4">
              {pendingActions.map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  isForMe={true}
                  onComplete={handleComplete}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Completed Actions */}
        {completedActions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h2 className="text-white/60 font-semibold text-sm uppercase tracking-wide mb-4">
              Completed
            </h2>
            <div className="space-y-4">
              {completedActions.slice(0, 10).map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  isForMe={action.to_player === currentUser}
                  onComplete={handleComplete}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {pendingActions.length === 0 && completedActions.length === 0 && (
          <EmptyState message="No actions yet. Create one to get started!" />
        )}
      </div>

      {/* Spin Modal */}
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
                  Spin for {otherPlayer}
                </h2>
                <p className="text-white/60 text-sm">
                  Tap the wheel to generate a prompt
                </p>
              </div>
              
              <SpinWheel onResult={handleSpinResult} />

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

      {/* Loading Overlay */}
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
