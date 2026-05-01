import './globals.css'
import ClientParallaxWrapper from './components/ClientParallaxWrapper'
import ScrollReveal from './components/ScrollReveal'
import SideNavigation from './components/SideNavigation'
import ChatWidget from './components/ChatWidget'
import Navbar from './components/Navbar'

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

        {/* Navbar with admin event listener */}
        <Navbar />

        {/* Side navigation panel */}
        <SideNavigation />

        {/* Main content area */}
        <div className="main-content-wrapper">
          <div className="central-content">
            <main>
              {children}
            </main>
          </div>
        </div>

        {/* AI Assistant - fixed dock panel */}
        <ChatWidget />

        <ScrollReveal />
      </body>
    </html>
  )
}
