import React from 'react'
import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#', label: 'Email' }
  ]

  return (
    <footer className="relative mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Research Paper Builder
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Create professional academic papers with stunning 3D design and premium features.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Features', 'Builder', 'Documentation', 'API'].map((link) => (
                <li key={link}>
                  <motion.a
                    whileHover={{ x: 5, color: '#38bdf8' }}
                    href="#"
                    className="text-gray-400 text-sm hover:text-primary-400 transition-colors"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.href}
                  className="w-10 h-10 bg-dark-800/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center">
            Made by me
            <span className="mx-2">•</span>
            © 2025 All rights reserved
          </p>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
    </footer>
  )
}
