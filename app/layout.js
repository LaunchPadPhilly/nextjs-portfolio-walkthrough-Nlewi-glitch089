import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ClientParallaxWrapper from './components/ClientParallaxWrapper'
import ScrollReveal from './components/ScrollReveal'

export const metadata = {
  title: 'My Portfolio',
  description: 'A Next.js portfolio website showcasing my projects and skills',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-root">
        {/* animated background layers (client) */}
        <ClientParallaxWrapper />

        <Navbar />

        <main>
          {children}
        </main>

        <Footer />

        <ScrollReveal />
      </body>
    </html>
  )
}
