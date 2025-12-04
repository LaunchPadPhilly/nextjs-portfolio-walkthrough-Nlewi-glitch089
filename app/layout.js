import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'My Portfolio',
  description: 'A Next.js portfolio website showcasing my projects and skills',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow pt-6 pb-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
