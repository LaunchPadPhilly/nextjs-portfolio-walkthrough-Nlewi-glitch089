import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Parallax from './components/Parallax'

export const metadata = {
  title: 'My Portfolio',
  description: 'A Next.js portfolio website showcasing my projects and skills',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-root">
        {/* animated background layers */}
        <div className="cosmic-bg" aria-hidden="true">
          <div className="gradient" />
          <div className="nebula" />
          <div className="stars" />
        </div>
        <Parallax />

        <Navbar />

        <main style={{ flex: 1 }}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
