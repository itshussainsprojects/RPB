# Research Paper Builder - Premium 3D Web Application

A stunning 3D web application for creating professional research papers with IEEE, ACM, APA, Chicago, and MLA formats.

## 🚀 Features

- **Premium 3D Design**: Beautiful Three.js animations and particle effects
- **Scroll-based Animations**: Smooth parallax scrolling with Framer Motion
- **Fully Responsive**: Works perfectly on all devices
- **Multiple Formats**: Support for IEEE, ACM, APA, Chicago, and MLA
- **Real-time Preview**: See your changes instantly
- **PDF Export**: Generate professional PDFs

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📦 Installation

1. Navigate to the web-app directory:
```bash
cd web-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 🎨 Key Features

### 3D Elements
- Animated 3D sphere with distortion effects
- Particle field with 2000+ particles
- Dynamic lighting and shadows

### Animations
- Smooth scroll-based animations
- Parallax effects
- Hover animations on all interactive elements
- Floating and glowing effects

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly controls

## 📱 Sections

1. **Hero Section**: Eye-catching landing with 3D animations
2. **Features Section**: Showcase of all capabilities
3. **Paper Builder**: Interactive paper creation interface
4. **Footer**: Social links and information

## 🎯 Usage

1. Click "Add Section" buttons to add paper sections
2. Fill in your content for each section
3. Select your preferred format (IEEE, ACM, APA, Chicago, MLA)
4. Click "Generate PDF" to export

## 🔗 Backend Integration

The frontend is ready to connect to a Python/Flask backend for PDF generation.
To set up the backend:

1. Create a Flask API in the parent directory
2. Implement endpoints for:
   - `/api/generate-latex`
   - `/api/generate-pdf`
   - `/api/upload-image`

## 🎨 Color Scheme

- Primary: Blue (#0ea5e9)
- Secondary: Purple (#c084fc)
- Background: Dark (#020617)
- Accent: Cyan (#38bdf8)

## 📄 License

MIT License - feel free to use for your projects!

## 🙏 Credits

Built with modern web technologies for an amazing user experience.
