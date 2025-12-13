import React, { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'

// Lazy load components for better performance
const Hero = React.lazy(() => import('./components/Hero'))
const ParticleBackground = React.lazy(() => import('./components/ParticleBackground'))
const Navigation = React.lazy(() => import('./components/Navigation'))
const PaperBuilder = React.lazy(() => import('./components/PaperBuilder'))
const Features = React.lazy(() => import('./components/Features'))
const Footer = React.lazy(() => import('./components/Footer'))
const Scene3D = React.lazy(() => import('./components/Scene3D'))

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen bg-dark-950 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-xl text-gray-400 animate-pulse">Loading Premium Experience...</p>
    </div>
  </div>
)

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="relative min-h-screen bg-dark-950">
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Navigation */}
        <Navigation activeSection={activeSection} />

        {/* 3D Scene Background */}
        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
          <Scene3D scrollY={scrollY} />
        </div>

        {/* Main Content */}
        <main className="relative z-10">
          {/* Hero Section */}
          <section id="home" className="min-h-screen">
            <Hero scrollY={scrollY} />
          </section>

          {/* Features Section */}
          <section id="features" className="min-h-screen py-20">
            <Features scrollY={scrollY} />
          </section>

          {/* Paper Builder Section */}
          <section id="builder" className="min-h-screen py-20">
            <PaperBuilder />
          </section>

          {/* Footer */}
          <Footer />
        </main>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-600 to-purple-500 z-50 origin-left"
          style={{
            scaleX: scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)
          }}
        />
      </div>
    </Suspense>
  )
}

export default App
