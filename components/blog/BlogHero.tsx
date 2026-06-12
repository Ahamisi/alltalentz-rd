'use client'

import { motion } from 'framer-motion'

export default function BlogHero() {
  return (
    <section className="relative bg-primary overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 50% 60%, #F99621 0%, transparent 60%)',
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28 md:py-36">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-secondary text-sm font-semibold tracking-widest uppercase mb-4"
        >
          Our Blog
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-white text-4xl md:text-6xl font-bold leading-tight max-w-2xl"
        >
          Blog Insights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-gray-400 mt-5 text-lg md:text-xl max-w-xl leading-relaxed"
        >
          Explore our latest articles and industry insights on remote work,
          talent acquisition, and the future of work in Africa.
        </motion.p>
      </div>
    </section>
  )
}
