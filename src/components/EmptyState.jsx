import { motion } from 'framer-motion'

export default function EmptyState({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-6"
      />
      <p className="text-white/40 text-center text-sm">{message}</p>
    </motion.div>
  )
}
