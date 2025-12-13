import React from 'react'
import { motion, useTransform, useScroll } from 'framer-motion'
import { ArrowDown, Sparkles, Zap, Shield } from 'lucide-react'

export default function Hero({ scrollY }) {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 100])

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="relative min-h-screen flex items-center justify-center px-4 pt-20"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary-400 animate-pulse" />
          <span className="text-sm text-gray-300">Premium RPB</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
        >
          <span className="gradient-text glow-text">
            Research Papers
          </span>
          <br />
          <span className="text-white">
            Reimagined
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Create stunning academic papers with our revolutionary 3D builder.
          IEEE, ACM, APA, Chicago, and MLA formats — all in one beautiful platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(14, 165, 233, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 via-primary-600 to-purple-600 rounded-full text-white font-semibold text-lg shadow-2xl shadow-primary-500/50 flex items-center space-x-2 animate-glow"
          >
            <Zap className="w-5 h-5" />
            <span>Start Building</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 glass-effect rounded-full text-gray-300 font-semibold text-lg flex items-center space-x-2 hover:text-white transition-colors"
          >
            <Shield className="w-5 h-5" />
            <span>View Features</span>
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-16"
        >
          {[
            { value: '5+', label: 'Formats' },
            { value: '100%', label: 'Responsive' },
            { value: '3D', label: 'Experience' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, y: -5 }}
              className="glass-effect rounded-2xl p-6 transform-3d"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col items-center"
        >
          <span className="text-sm text-gray-500 mb-2">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-6 h-6 text-primary-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>
    </motion.div>
  )
}
