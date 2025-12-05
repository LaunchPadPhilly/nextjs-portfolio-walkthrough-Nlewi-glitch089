import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ClientParallaxWrapper from './components/ClientParallaxWrapper'

export const metadata = {
  title: 'My Portfolio',
  description: 'A Next.js portfolio website showcasing my projects and skills',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* animated background layers (client) */}
        <ClientParallaxWrapper />

        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
