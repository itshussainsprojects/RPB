import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

export const paperAPI = {
  // Generate LaTeX
  generateLatex: async (sections, format) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/generate-latex`, {
        sections,
        format
      })
      return response.data
    } catch (error) {
      console.error('Error generating LaTeX:', error)
      throw error
    }
  },

  // Generate PDF
  generatePDF: async (sections, format) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/generate-pdf`, {
        sections,
        format
      }, {
        responseType: 'blob'
      })
      return response.data
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw error
    }
  },

  // Upload image
  uploadImage: async (file, sectionName) => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      formData.append('sectionName', sectionName)
      
      const response = await axios.post(`${API_BASE_URL}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }
}
