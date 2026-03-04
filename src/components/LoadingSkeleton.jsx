import { motion } from 'framer-motion'

export default function LoadingSkeleton() {
  return (
    <div className="max-w-lg mx-auto px-6 pt-24 space-y-6">
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-full h-16 rounded-full bg-white/5"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        className="bg-white/5 rounded-3xl p-8 space-y-4"
      >
        <div className="w-24 h-6 rounded-full bg-white/10" />
        <div className="w-full h-20 rounded-2xl bg-white/10" />
        <div className="w-full h-12 rounded-full bg-white/10" />
      </motion.div>
    </div>
  )
}
