import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Palette, Download, Zap, Shield, Globe } from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Multiple Formats',
    description: 'Support for IEEE, ACM, APA, Chicago, and MLA citation styles',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description: 'Stunning 3D animations and premium visual experience',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Download,
    title: 'Instant Export',
    description: 'Generate professional PDFs with a single click',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with real-time preview',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your research data is safe and encrypted',
    color: 'from-red-500 to-rose-500'
  },
  {
    icon: Globe,
    title: 'Fully Responsive',
    description: 'Works perfectly on all devices and screen sizes',
    color: 'from-indigo-500 to-blue-500'
  }
]

export default function Features({ scrollY }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6"
        >
          <span className="gradient-text">Powerful Features</span>
        </motion.h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Everything you need to create professional research papers with style
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              transition: { duration: 0.2 }
            }}
            className="glass-effect rounded-2xl p-8 transform-3d cursor-pointer group"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl transition-shadow`}
            >
              <feature.icon className="w-8 h-8 text-white" />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-white mb-3 group-hover:gradient-text transition-all">
              {feature.title}
            </h3>
            
            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
              {feature.description}
            </p>

            {/* Hover Effect Line */}
            <motion.div
              className={`h-1 bg-gradient-to-r ${feature.color} rounded-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity`}
            />
          </motion.div>
        ))}
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
        />
      </div>
    </div>
  )
}
