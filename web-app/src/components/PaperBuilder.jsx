import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Image, FileText, Download, Sparkles } from 'lucide-react'

const formatOptions = ['IEEE', 'ACM', 'APA', 'Chicago', 'MLA']
const sectionTypes = ['Abstract', 'Introduction', 'Methodology', 'Results', 'Discussion', 'Conclusion', 'References']

export default function PaperBuilder() {
  const [sections, setSections] = useState([])
  const [selectedFormat, setSelectedFormat] = useState('IEEE')
  const [isGenerating, setIsGenerating] = useState(false)

  const addSection = (type) => {
    setSections([...sections, {
      id: Date.now(),
      type,
      title: type,
      content: '',
      images: []
    }])
  }

  const removeSection = (id) => {
    setSections(sections.filter(s => s.id !== id))
  }

  const updateSection = (id, field, value) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ))
  }

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    // Simulate PDF generation
    setTimeout(() => {
      setIsGenerating(false)
      alert('PDF generation would connect to your Python backend!')
    }, 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
          <span className="gradient-text">Build Your Paper</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Add sections, customize content, and export to professional formats
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section List */}
          <AnimatePresence>
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass-effect rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                      className="text-xl font-semibold bg-transparent border-none outline-none text-white"
                      placeholder="Section Title"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeSection(section.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>

                <textarea
                  value={section.content}
                  onChange={(e) => updateSection(section.id, 'content', e.target.value)}
                  placeholder="Write your content here..."
                  className="w-full h-32 bg-dark-800/50 rounded-lg p-4 text-gray-300 border border-primary-500/20 focus:border-primary-500/50 outline-none resize-none transition-colors"
                />

                <div className="mt-4 flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-dark-800/50 rounded-lg text-gray-300 hover:text-white transition-colors"
                  >
                    <Image className="w-4 h-4" />
                    <span>Add Image</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add Section Buttons */}
          {sections.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-effect rounded-2xl p-12 text-center"
            >
              <Sparkles className="w-16 h-16 text-primary-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold text-white mb-2">Start Building</h3>
              <p className="text-gray-400 mb-6">Add your first section to begin</p>
            </motion.div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {sectionTypes.map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addSection(type)}
                className="glass-effect rounded-xl p-4 text-center hover:border-primary-500/50 transition-colors group"
              >
                <Plus className="w-6 h-6 mx-auto mb-2 text-primary-400 group-hover:animate-pulse" />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {type}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Format Selection */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-6 sticky top-24"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-primary-400" />
              Format Style
            </h3>
            
            <div className="space-y-3">
              {formatOptions.map((format) => (
                <motion.button
                  key={format}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedFormat(format)}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    selectedFormat === format
                      ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg shadow-primary-500/50'
                      : 'bg-dark-800/50 text-gray-300 hover:bg-dark-700/50'
                  }`}
                >
                  <div className="font-semibold">{format}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {format === 'IEEE' && 'Engineering & Computer Science'}
                    {format === 'ACM' && 'Computer Science'}
                    {format === 'APA' && 'Social Sciences'}
                    {format === 'Chicago' && 'Humanities'}
                    {format === 'MLA' && 'Literature & Arts'}
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGeneratePDF}
                disabled={sections.length === 0 || isGenerating}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${
                  sections.length === 0 || isGenerating
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50 hover:shadow-green-500/70'
                }`}
              >
                <Download className={`w-5 h-5 ${isGenerating ? 'animate-bounce' : ''}`} />
                <span>{isGenerating ? 'Generating...' : 'Generate PDF'}</span>
              </motion.button>

              <p className="text-xs text-gray-500 mt-3 text-center">
                {sections.length} section{sections.length !== 1 ? 's' : ''} added
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
